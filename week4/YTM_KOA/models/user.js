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

  const UserDB = mongoose.connection.useDb('User');    //connect to the db

  module.exports = UserDB.model('User', userSchema);