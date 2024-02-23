const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

//encrypt secret uses AES-128-ECB encrypted ciphertext with a custom key. 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}






app.post('/login', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Login successful' });
});


app.post('/signup', (req, res) => {
    const username = req.body.username;
    const remember = req.body.remember;
    const secret = req.body.secret;
    encrypted_secret  = aesEncrypt(secret, 'a1b2c3d4e5f6g7h8');
    console.log("signup successful")
    res.json({username: username, remember: remember, secret: encrypted_secret});
    //encrypt secret uses AES-128-ECB encrypted ciphertext with a custom key and then stored in the database.

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
