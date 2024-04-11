
const Router = require('koa-router');
const path = require('path');
const router = new Router();
const koaMedia = require("./core/stream_audio.js");
const login = require('./core/auth.js').login;
const signup = require('./core/auth.js').signup;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const {findUser} = require('./database/auth.js');
const {readTrackIndex,readPlaylistByPid,writePlaylist, readPlaylistsByUserId} = require('./database/dbConnection.js');



const jwtSecret = 'YTM';

//jwt auth middleware
const jwtAuth = async (ctx, next) => {
  const token = ctx.cookies.get('auth_token');
  if (token) {
      try {
          ctx.state.user = jwt.verify(token, jwtSecret);
          await next();
          
      } catch (err) {
          ctx.status = 401;
          ctx.body = 'Unauthorized: invalid token';
      }
  } else {
      ctx.status = 401;
      ctx.body = 'Unauthorized: no token provided';
  }
}

router.post('/login', async ctx => {
  await login(ctx.request.body.username, ctx.request.body.password).then((result) => {
      if (result) {
          //set cookie
          const token = jwt.sign({username: ctx.request.body.username}, jwtSecret, {expiresIn: '1h'})
          ctx.cookies.set('auth_token', token, {httpOnly: true, maxAge: 60 * 60 * 1000})
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 0, msg: 'Login Success', token: token})
      } else {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 1, msg: 'Username or Password incorrect'})
      }
  })
})


router.post('/signup', async ctx => {

  await signup(ctx.request.body.username, ctx.request.body.password).then((result) => {
     
      if (result) {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 0, msg: 'Signup Success'})
      } else {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 1, msg: 'Username already exists'})
      }
  })
})



// get username from jwt token
router.get('/getuser', jwtAuth, async (ctx) => {
  // Extract the username from the state.user, which was set by the jwtAuth middleware
  const { username } = ctx.state.user;
  ctx.body = { username };
});


// return uid of the user
router.get('/user/:username', async (ctx) => {
  const username = ctx.params.username;
  const user = await findUser(username);
  if (user) {
      ctx.status = 200;
      ctx.body = user.uid;
  }
  else {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
  }
});


//stream audio file
router.get('/stream/:trackId', async (ctx, next) => {
  const trackId = ctx.params.trackId;
  try {
    const trackIndex = await readTrackIndex();
    const track = trackIndex.find(t => t.track_id === trackId);
    if (!track) {
      ctx.status = 404;
      ctx.body = 'Track not found';
      return;
    }
    const filePath = path.join(__dirname, '..', 'local_storage', track.fileName);
    
    if (!fs.existsSync(filePath)) {
      ctx.status = 404;
      ctx.body = 'File not found';
      return;
    }

    console.log(filePath);
    ctx.path = filePath;
    ctx.request.header['range'] = 'bytes=0-';
  
    await koaMedia({
      extMatch: /\.mp[3-4]$/i,
    })(ctx); 

  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal server error', error: error.message };
  }
  await next();
});



//explore:get all music file in the library
router.get('/explore', async (ctx, next) => {
  const trackIndex = await readTrackIndex();
  ctx.type = 'json';
  ctx.body = JSON.stringify(trackIndex);
  await next();
});



//create playlist
router.post('/playlist', jwtAuth, async (ctx) => {
  try {
    
    console.log('yo1');
    const playlistData = ctx.request.body;
    const pid = crypto.createHash('md5').update(playlistData.name).digest('hex').substring(0, 16);


    const newPlaylistData = {
      pid: pid,
      author: playlistData.author,
      name: playlistData.name,
      description: playlistData.description,
      tracks: [] // Initialize with an empty array of tracks
    };
    
    await writePlaylist(newPlaylistData);
    ctx.status = 200;  
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal server error', error: error.message };
  }
});

//search playlist:
router.get('/playlist/:pid', async (ctx) => {
  const pid = ctx.params.pid;
  try {
      const playlist = await readPlaylistByPid(pid);
      if (playlist) {
          ctx.status = 200;
          ctx.body = playlist;
      } else {
          ctx.status = 404;
          ctx.body = { message: 'Playlist not found' };
      }
  } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Internal server error', error: error.message };
  }
});


//searchalnum: return all tracks that has the album pid in the Track collection
router.get('/album/:pid', jwtAuth, async (ctx) => {
  const searchTerm = ctx.params.pid;  // assume pid is the name of the album
  const regex = new RegExp(searchTerm, 'i'); // 'i' for case insensitive

  try {
    const tracks = await readTrackIndex();
    // Use the RegExp to test for a partial match in the album name
    const filteredTracks = tracks.filter(track => regex.test(track.album));

    if (filteredTracks.length > 0) {
      ctx.status = 200;
      ctx.body = filteredTracks;
    } else {
      ctx.status = 200;
      ctx.body = { message: 'No tracks found matching the search term' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal server error', error: error.message };
  }
});


//search songs:
router.get('/songs/:pid', jwtAuth, async (ctx) => {
  const searchTerm = ctx.params.pid;  // assume pid is the name of the album
  const regex = new RegExp(searchTerm, 'i'); // 'i' for case insensitive

  try {
    const tracks = await readTrackIndex();
    // Use the RegExp to test for a partial match in the album name
    const filteredTracks = tracks.filter(track => regex.test(track.title));

    if (filteredTracks.length > 0) {
      ctx.status = 200;
      ctx.body = filteredTracks;
    } else {
      ctx.status = 200;
      ctx.body = { message: 'No tracks found matching the search term' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal server error', error: error.message };
  }
});


// Search songs by artist
router.get('/artists/:artistName', jwtAuth, async (ctx) => {
  const searchTerm = ctx.params.artistName;
  const regex = new RegExp(searchTerm, 'i'); // 'i' for case insensitive

  try {
    const tracks = await readTrackIndex();
    // Use the RegExp to test for a partial match in the artist array
    const filteredTracks = tracks.filter(track => 
      track.artist.some(artistName => regex.test(artistName))
    );

    if (filteredTracks.length > 0) {
      ctx.status = 200;
      ctx.body = filteredTracks;
    } else {
      ctx.status = 200;
      ctx.body = { message: 'No tracks found for the given artist' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal server error', error: error.message };
  }
});















//return playlist by author
router.get('/playlist/author/:author', async (ctx) => {
  const author = ctx.params.author;
  console.log(author);
  try {
      const playlists = await readPlaylistsByUserId(author);
      //console.log(playlists);
      if (playlists) {
          ctx.status = 200;    
          ctx.body = playlists;
      } else {
          ctx.status = 404;
          ctx.body = { message: 'Playlist not found' };
      }
  } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Internal server error', error: error.message };
  }
});





module.exports =  router
