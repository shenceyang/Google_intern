const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Library = new Schema({

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



//generate diff collections under database
const index_collection = mongoose.model('Library', Library,"index");

//create user private library collection
function createUserLibraryLibraryModel(uid) {
    const collectionName = `u_${uid}`;
    return mongoose.model('Library', Library, collectionName);
}
 

module.exports = {index_collection, createUserLibraryLibraryModel};