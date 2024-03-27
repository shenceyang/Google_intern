const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User schema
const userSchema = new Schema({
    uid: mongoose.Types.ObjectId,
    name: String,
    secret: String,
    subscribe: String,
    subscribe_expired: {
        type: Date,
        default: Date.now(),
        required: true
    },
    last_login: {
        type: Date,
        default: Date.now(),
        required: true
    },
    playing: String
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
async function findUser(username){
    return await User.findOne({name: username}).then((data) => {
        return data
    })
}


module.exports = { createUser, findUser };