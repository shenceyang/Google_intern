const fs = require('fs');

function readWAV(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}


readWAV('./test.wav').then((data) => {
    console.log(data.toString()); //result of readFile is a buffer
}).catch((err) => {
    console.log(err);
});




