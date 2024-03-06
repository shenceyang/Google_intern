const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User schema
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

//connect to the User db
const UserDB = mongoose.connection.useDb('User'); 
const User = UserDB.model('User', userSchema);



//save user to db
async function createUser(userInfo){
    const newUser = new User(userInfo);
    await newUser.save().catch((err) => {
        console.log(err);
    });
}


//find user
async function findUser(userInfo){
    return await User.findOne(userInfo).catch((err) => {
        console.log(err);
    });
}

module.exports = { createUser, findUser };