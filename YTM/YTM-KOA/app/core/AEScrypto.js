const crypto = require('crypto')

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes-128-ecb', key)
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex')
    return encrypted
}

function aesDecrypt(encrypted, key) {
    const cipher = crypto.createDecipher('aes-128-ecb', key)
    let decrypted = cipher.update(encrypted, 'hex', 'utf-8');
    decrypted += cipher.final('hex')
    return decrypted
}

const key = 'JustATestKeyHere'

module.exports= {aesEncrypt, aesDecrypt, key}