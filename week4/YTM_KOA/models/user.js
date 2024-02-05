const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    secre:{
        type: String,
        required: true
    },
    subscribe:{
        type: String
    },
    subscribe_expired:{
        type: Date,
        required: true
    },
    last_login:{
        type: Date
    },
    playing:{
        type: String
       
    }
  });

  module.exports = mongoose.model('User', userSchema);