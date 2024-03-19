const findUser = require('../database/auth').findUser;
const createUser = require('../database/auth').createUser;
const aesEncrypt = require('../core/AEScrypto').aesEncrypt;
const key = require('../core/AEScrypto').key;
const mongoose = require('mongoose');

async function login(username, password){
    const userData = await findUser(username)
    const secret = aesEncrypt(password, key)
    return !(userData === null || userData.secret !== secret);
}

async function signup(username, password){
    let userData = await findUser(username)
    if (userData !== null){
        return false
    }else{
        userData = {
            uid: new mongoose.Types.ObjectId(),
            name: username,
            secret: aesEncrypt(password, key),
            subscribe: 'none',
            subscribe_expired: Date.now(),
            last_login: Date.now(),
            playing: 'none'
        }
        await createUser(userData).catch((err) => {
            console.log('Error',err)
            return false
        })
        return true
    }
}

module.exports = {login, signup}