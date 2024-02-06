const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playlistSchema = new Schema({

        //index collection
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
        type: String,
        last_update: Date,
        
        //single list collection
        tid: String,
        order: Number,
      });
      
const PlaylisyDB = mongoose.connection.useDb('PlayList');    //connect to the db

const index_Playlist_collection = PlaylisyDB.model('Playlist', playlistSchema, 'index');   // store under specific collection
const single_Playlist_collection = PlaylisyDB.model('Playlist', playlistSchema, 'single'); 

module.exports = {index_Playlist_collection, single_Playlist_collection};