const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
app.use(async ctx => {
  ctx.body = 'Hello World';
});



const username = 'test';
const password = 'test123';

const dbURL = `mongodb+srv://${username}:${password}@atlascluster.1k4mtwp.mongodb.net`;

mongoose.connect(dbURL)
.then(() => {
    console.log('connected to db');
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');})

    }
).catch((err) => {
    console.log(err)
})



  

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

test = {
    track_id: '1234567890abcdeg',
    title: 'test',
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

const Librarydb = require("../YTM_KOA/models/library.js");      

const TEST_DB  = new Librarydb.index_collection(test);
TEST_DB.save().then(() => {
    console.log('test data saved');
}).catch((err) => {
    console.log(err);
})

/*
BUG: the api doesnt work, i try to send http request using postman, but there's no response
*/

router.post('/libraryBuild', async (ctx) => {
    try{
        console.log('Building Library');
        //store into mongoDB index collection of Library database
        for (const file of files_info){
            const newTrack = new Librarydb.index_collection(file);   //defined before
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


