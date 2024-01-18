'use strict';
const fs = require('fs');
var readStream  = fs.createReadStream('input.mp3');
var writeStream = fs.createWriteStream('output.mp3');

//use pipe to read from readStream and write to writeStream
readStream.pipe(writeStream);


