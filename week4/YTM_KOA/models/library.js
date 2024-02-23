const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({

    //index collection
    track_id: {
        type: String,
    },
    title: {
        type: String,
    },
    artist: {
        type: [String],
    },
    album: {
        type: String,
    },
    album_id: {
        type: String,
    },
    genre: {
        type: String,
    },
    copyright:{
        type: String,
    },
    length: {
        type: String,
    },
    track_number: {
        type: Number,
    },
    quality: {
        type: String,
    },
    file: {
        type: String,
    },

    
    // user private library collection
    type: { type: String, enum: ['track', 'album', 'playlist']},

    id: {type: String,
        },
        
    added_date: {type:Date}
});



const LibraryDB = mongoose.connection.useDb('Library');

function createUserLibraryLibraryModel(uid) {
    const collectionName = `u_${uid}`;
    return LibraryDB.model('Library', LibrarySchema, collectionName);
}
 
const index_collection = LibraryDB.model('Library', LibrarySchema, "index");
module.exports = {index_collection, createUserLibraryLibraryModel};