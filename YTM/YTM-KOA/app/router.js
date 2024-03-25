
const Router = require('koa-router');
const path = require('path');
const router = new Router();
const koaMedia = require("./core/stream_audio.js");
const login = require('./core/auth.js').login;
const signup = require('./core/auth.js').signup;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {readTrackIndex,readPlaylistByPid} = require('./database/dbconnection.js');



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



// getUser route
router.get('/getuser', jwtAuth, async (ctx) => {
  // Extract the username from the state.user, which was set by the jwtAuth middleware
  const { username } = ctx.state.user;
  ctx.body = { username };
});


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


/*
router.get('/stream/:trackId', async (ctx, next) => {
  const trackId = ctx.params.trackId;
  const filePath = path.join(__dirname, '..','local_storage',`${trackId}.mp4`);
  console.log(filePath);
  ctx.path = filePath;
  ctx.request.header['range'] = 'bytes=0-';

  await koaMedia({
    extMatch: /\.mp[3-4]$/i,
  })(ctx); 

  await next();

});

*/


//explore:get all music file in the library
router.get('/explore', async (ctx, next) => {
  const trackIndex = await readTrackIndex();
  ctx.type = 'json';
  ctx.body = JSON.stringify(trackIndex);
  await next();
});



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

//return all tracks that has the album pid in the Track collection
router.get('/album/:pid', jwtAuth, async (ctx) => {
  const albumName = ctx.params.pid; // Assuming pid is the album name for hashing
  const albumIdHash = crypto.createHash('md5').update(albumName).digest('hex').substring(0, 16);
  
  try {
      const tracks = await readTrackIndex();
      const filteredTracks = tracks.filter(track => track.album_id === albumIdHash);

      if (filteredTracks.length > 0) {
          ctx.status = 200;
          ctx.body = filteredTracks;
      } else {
          ctx.status = 404;
          ctx.body = { message: 'No tracks found for the given album' };
      }
  } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Internal server error', error: error.message };
  }
});




module.exports =  router
