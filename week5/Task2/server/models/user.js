const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
       
    
  });

  const UserDB = mongoose.connection.useDb('User');    //connect to the db

  module.exports = UserDB.model('User', userSchema);