const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
app.use(async ctx => {
  ctx.body = 'Hello World';
});



const username = 'test'
const password = 'test123'

const dbURL = `mongodb+srv://${username}:${password}@atlascluster.1k4mtwp.mongodb.net/`

mongoose.connect(dbURL)
.then(() => {
    console.log('connected to db')
    }
).catch((err) => {
    console.log(err)
})


                                                            //generate collections under database

const Library = require('./models/library');

//create index collection and user private library collection
const index_Library = mongoose.model('Library', Library, 'index');

//create user private library collection
function createUserLibraryLibraryModel(uid) {
    const collectionName = `u_${uid}`;
    return mongoose.model('Library', Library, collectionName);
}
 
//create collections for playlist database
const Playlist = require('./models/playlist');
const index_Playlist = mongoose.model('Playlist', Playlist, 'index');
const single_Playlist = mongoose.model('Playlist', Playlist, 'single');




                                                                        
                                                            //store library data into the database
const Router = require('@koa/router');
const router = new Router();

//since the music-metadata library is not available, i will hardcode the medata
const files_info = [
    {
        track_id: '1234567890abcdef',
        title: 'song1',
        artist: ['kanye west'],
        album: 'Unknown Album',
        album_id: '1234567890abcdef',
        genre: 'rap',
        copyright: 'Not Available',
        length: '3 min',
        track_number: 0,
        quality: 'STD',
        file: 'path/to/file'
    },
    {
        track_id: '1234567890abcdeg',
        title: 'song2',
        artist: ['travis scott'],
        album: 'Unknown Album',
        album_id: '1234567890abcdef',
        genre: 'rap',
        copyright: 'Not Available',
        length: '3 min',
        track_number: 0,
        quality: 'STD',
        file: 'path/to/file'
    }   
]

router.post('/libraryBuild', async (ctx) => {
    try{
        //store into mongoDB index collection of Library database
        for (const file of files_info){
            const newTrack = new index_Library(file);   //defined before
            await newTrack.save();
        }

        //return status and result to the client
        ctx.status = 200;
        ctx.body = {
            status: 'success',
        }
        return ctx;

    }catch(err){
        console.log(err);
    }
});


