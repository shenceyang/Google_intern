
// 1.Nodejs routing : see routing_notes folder

//----------------------------------------------------------Axios----------------------------------------------------------//
/*                                   

Axios is a promise based HTTP client for the browser and node.js.

- express vs axios:
You can think of express.js as a warehouse:
app.get('/item/:name', async function (req, res) {
  res.send(await findItemByName(req.params.name));
});

If you want to get an item, for example a pencil, from this warehouse, you can use axios.js.
axios.get('/item/pencil')



*/
const axios = require('axios');


                                              //1. GET
//promise method:
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
    .then(function (response) {
    // handle success
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
        // always executed
});

// async/await method:
async function getUser() {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


                                        //2. POST: create new 

axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
});

//performing multiple concurrent requests:
function getUserAccount() {
    return axios.get('/user/12345');
}
function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}
const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()]);

//post an HTML form as JSON:
const {data} = await axios.post('/user', document.querySelector('#my-form'), {
    headers: {
      'Content-Type': 'application/json'
    }
})

//Forms: multipart/form-data
const {datas} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3],
    photo: document.querySelector('#fileInput').files
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)



//axios(config): request can be made by passing the relevant config to axios.
axios({
    method: 'post',
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  });


//create instance:
const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });



/*response contains following information:
{

    data: {},

    status: 200,
  
    statusText: 'OK',
  
    headers: {},
  
    config: {},
  
    request: {}
}
*/

//----------------------------------------------------------Axios----------------------------------------------------------//




//----------------------------------------------------------Crypto Module----------------------------------------------------------//

//1. MD5 hashing:
const crypto = require('crypto');
const hash = crypto.createHash('md5');
hash.update('some data to hash');
hash.update('some other data to hash');
console.log(hash.digest('hex'));


//Hmac hashing: need a secret key
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
console.log(hmac.digest('hex')); // 80f7e22570...


//AES: symmetric encryption
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data123 = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data123, key);
var decrypted = aesDecrypt(encrypted, key);




/*Diffie-Hellman: asymmetric encryption

The Diffie-Hellman (DH) algorithm is a key exchange protocol that allows two parties to negotiate a key without revealing the key itself.
The DH algorithm is based on mathematical principles. For example, if Xiao Ming and Xiao Hong want to negotiate a key, they can do it like this:

Xiao Ming first chooses a prime number and a base number, for instance, prime number p=23, base number g=5 (the base number can be arbitrarily chosen),
and then selects a secret integer a=6. He calculates A=g^a mod p=8, and then loudly tells Xiao Hong: p=23, g=5, A=8;

After receiving p, g, and A from Xiao Ming, Xiao Hong also chooses a secret integer b=15, then calculates B=g^b mod p=19, 
and loudly tells Xiao Ming: B=19;

Xiao Ming then calculates s=B^a mod p=2, and Xiao Hong also calculates s=A^b mod p=2. Therefore, the final negotiated key s is 2.

In this process, the key 2 is not something Xiao Ming tells Xiao Hong, nor is it something Xiao Hong tells Xiao Ming, but rather it is something 
both sides calculate through negotiation. A third party can only know p=23, g=5, A=8, B=19, and because they do not know the secret integers a=6
and b=15 chosen by the two parties, they cannot calculate the key 2."
*/

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512); // use 512 bits key size
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));

