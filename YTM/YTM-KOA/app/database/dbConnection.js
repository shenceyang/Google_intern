const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Library db connection
const libraryDB = mongoose.connection.useDb('Library');
const trackSchema = new Schema({
    track_id: String,
    title: String,
    artist: Array,
    album: String,
    album_id: String,
    genre: String,
    copyright: String,
    length: String,
    track_number: Number,
    quality: String,
    file: String,
    fileName: String,
},
{collection: 'indexes'});
const Track = libraryDB.model('Index', trackSchema);

async function writeTrackIndex(trackInfo) {
    const trackDocument = new Track(trackInfo);
    //console.log(trackDocument)
    await trackDocument.save().catch(err => {
        console.log("failed to save track info to db")
        console.error(err)
    })
}

async function readTrackIndex() {
    const indexData = await Track.find().then((data) => {
        return data
    })
   
    return indexData
}

async function deleteTrackIndex(track_id) {
    await Track.deleteOne({track_id})
}







//Playlists db connection
const playlistDB = mongoose.connection.useDb('Playlists');
const playListsIndexSchema = new Schema({
    pid: String,
    author: String,
    name: String,
    description: String,
    added: Number,
    liked: Number,
    shared: Number,
    played: Number,
    public: Boolean,
    image: String,
    'type': {
        type: String,
        enum: ['playlist', 'album']
    },
    last_update: {
        type: Date,
        default: Date.now(),
        required: true
    }
}, {collection: 'indexes'});

/*
Despite both models being named 'Index', they are differentiated by the DB objects they are attached to. 
we use the 'track' and 'playListsIndex' to create new objects but not the 'Index' model.
*/

const playListsIndex = playlistDB.model('Index', playListsIndexSchema);




module.exports = {writeTrackIndex, readTrackIndex, deleteTrackIndex}