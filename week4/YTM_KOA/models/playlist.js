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
      
const index_Playlist = mongoose.model('Playlist', playlistSchema, 'index');
const single_Playlist = mongoose.model('Playlist', playlistSchema, 'single'); 

module.exports = {index_Playlist, single_Playlist};