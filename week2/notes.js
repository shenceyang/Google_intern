
/*---------------------------------------Event driven program---------------------------------------
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('EventName', eventHandler); //listen for event
eventEmitter.emit('EventName'); //fire event

*/

var events = require('events');
var eventEmitter = new events.EventEmitter();
 
var connectHandler = function connected() {
   console.log('连接成功。');
   eventEmitter.emit('data_received');
}
 
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});
 
// 触发 connection 事件 
eventEmitter.emit('connection');
console.log("程序执行完毕。");

//connection -> connectHandler -> data_received -> anonymous function

/*output:
连接成功。
数据接收成功。
程序执行完毕。
*/
//-------------------------------------Event driven program----------------------------------------




//--------------------------------------------------------EventEmitter------------------------------------------------------------
//-Events module only have one object: EventEmitter. Its core is on('event', callback) and emit('event').

//- One event support multiple listeners.
//event.js 文件
var events = require('events'); 
var emitter = new events.EventEmitter();    //create eventEmitter object!!!! 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 

/*output:
listener1 arg1 参数 arg2 参数
listener2 arg1 参数 arg2 参数
*/


/*other method of EventEmitter

-once(event, listener) - listener will only be called once

-removeListener(event, listener) - remove listener

-removeAllListeners([event]) - remove all listeners of event

-setMaxListeners(n) - warning if there are more than 10 listner, this method set max number of listeners of event

-listeners(event) - return array of listeners of event
*/

//listenerCount(emitter,event):return how many listeners of event
var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener2', arg1, arg2);
});
console.log(emitter.listenerCount("someEvent"));  //2



//code example:
var events = require('events');
var eventEmitter = new events.EventEmitter();

var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

eventEmitter.addListener('connection', listener1);
eventEmitter.on('connection', listener2);

var eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

eventEmitter.emit('connection');

eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

eventEmitter.emit('connection');

eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");

/*output:
$ node main.js
2 个监听器监听连接事件。
监听器 listener1 执行。
监听器 listener2 执行。
listener1 不再受监听。
监听器 listener2 执行。
1 个监听器监听连接事件。
程序执行完毕。
*/

//-----------------------------------------------------------------EventEmitter-----------------------------------------------------








//---------------------------------------------------------fs module--------------------------------------------------------------

//fs module has two version: sync and async. Sync version will block the program until it finish. Async version will not block the program.


                                                         //READ

//async reading
var fs = require("fs");
fs.readFile('sample.txt', 'utf-8', function (err, data) { //utf-8 is a character encoding. It is a way to convert binary to string.
    if (err) {
        console.log(err);
    } else {
        console.log(data);  //data is a string
    }
});


//async read img
fs.readFile('sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);  //data is a buffer
        console.log(data.length + ' bytes');
    }
});



/* When reading binary files, if you don't specify a file encoding, the data parameter in the callback function will return a Buffer object. 
In Node.js, a Buffer object is an array that contains zero or more bytes (note that this is different from an Array).
*/

//convert buffer obj to string
var text = data.toString('utf-8');
console.log(text);

//convert string to buffer obj
var buf = Buffer.from(text, 'utf-8');
console.log(buf);




//sync reading
var fs = require("fs");
try{
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
}catch(err){
    console.log(err);
}



                                                //WRITE
var fs = require('fs');
var data = 'Hello, Node.js';

//async write
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
                                    
//sync write
try{
    fs.writeFileSync('output.txt', data);
}catch(err){
    console.log(err);
}



                                                    //FILE STATS
var fs = require('fs');
fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // Is it a file:
        console.log('isFile: ' + stat.isFile());
        // Is it a directory:
        console.log('isDirectory: ' + stat.isDirectory());

        if (stat.isFile()) {
            console.log('size: ' + stat.size);
            console.log('birth time: ' + stat.birthtime);
            console.log('modified time: ' + stat.mtime);
        }
    }
}); 


/* choice between async or sync:

-Use of Asynchronous Methods:
1.Since Node.js is a server-side environment and runs JavaScript code on the server, it's essential to use asynchronous methods for most operations, 
especially those that involve repeated execution of business logic.

2.Node.js operates on a single-threaded event loop. Using synchronous methods for operations that run frequently during the server's operation can block this thread. This means that while the synchronous operation is being processed, the server cannot handle anything else, effectively stopping it from responding to other requests.
When to Use Synchronous Methods:

-There are specific scenarios where synchronous methods are appropriate in a server environment. For example:
1.Reading Configuration Files at Startup: When the server starts, it might need to load configuration settings. 
Using synchronous methods is acceptable here because this operation happens once and does not block the server during regular operations.

2.Writing to State Files at Shutdown: Similarly, when the server is shutting down and needs to write to state files 
(like log files or save settings), synchronous methods can be used as these operations happen once and do not interfere 
with the server's ability to handle requests during normal operation.
*/


//---------------------------------------------------------fs module--------------------------------------------------------------







//---------------------------------------------------------Nodejs buffer--------------------------------------------------------------

/*
In JavaScript, the only data type for handling text is the string type. JavaScript itself does not have a binary data type to directly 
handle binary data like binary files or TCP streams. However, when working with activities such as network communication (e.g., TCP streams)
or file operations that require binary data handling, a solution is needed.

Node.js addresses this requirement by providing the Buffer class. The Buffer class is part of Node.js's core library, which means it comes
bundled with Node.js and does not require any additional installation. The primary purpose of the Buffer class is to handle binary data.

A Buffer in Node.js can be thought of as a collection or an array of integers, where each integer represents a byte of data. 
However, unlike a typical array, a Buffer directly represents a fixed-size chunk of memory outside of the V8 JavaScript engine's heap.
This feature is crucial because it allows Node.js to handle and manipulate raw binary data efficiently.
*/


//Buffer and string
const buf = Buffer.from('runoob', 'ascii');
console.log(buf.toString('hex')); // 输出 72756e6f6f62
console.log(buf.toString('base64')); // 输出 cnVub29i


/*                                          Create Buffer objects:
Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0

Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据

Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）

Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。

Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例.

Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例
*/

// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');


                                                                /*write to buffer
buf.write(string[, offset[, length]][, encoding])

//parameters:
1. string: This is the string that you want to write into the buffer.

2. offset (optional): This is the index in the buffer at which to start writing the string. 
The default value is `0`, which means that writing starts from the beginning of the buffer.

3. length (optional): This parameter specifies the number of bytes to write. 
The default is the remaining space available in the buffer after the offset. 
If the length of the string is longer than this space, the string will be truncated. 
If the length is less than the space, only the specified number of bytes will be written.

4. encoding(optional): This parameter determines the character encoding used to write the string into the buffer.
The default encoding is `'utf8'`. Other common encodings are `'ascii'`, `'utf16le'`, `'ucs2'`, `'base64'`, and `'hex'`.
*/
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");
console.log("写入字节数 : "+  len);  //写入字节数 : 14


                                                                /*read from buffer
buf.toString([encoding[, start[, end]]])

//parameters:
1. encoding (optional): This is the encoding to use for the returned string.
The default is `'utf8'`. Other possible encodings are `'ascii'`, `'utf16le'`, `'ucs2'`, `'base64'`, and `'hex'`.

2. start (optional): This is the beginning index of the buffer to start reading.
The default is `0`.

3. end (optional): This is the ending index of the buffer to end reading.
The default is `buf.length`.
*/
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;  //97 is the ASCII code of 'a'
}
console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   //使用 'ascii' 编码, 并输出: abcde
console.log( buf.toString('utf8',0,5));    // 使用 'utf8' 编码, 并输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用默认的 'utf8' 编码, 并输出: abcde



                                                                //convert buffer to JSON
// use buf.toJSON()

const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

//parse JSON to buffer
const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});

/*The JSON.parse method is provided with a reviver function that checks if the current value being parsed 
is the special object representing a Buffer (i.e., it has a property "type" with the value "Buffer").
 If so, it reconstructs the Buffer using Buffer.from(value.data); otherwise, it returns the value unchanged.
*/


// 输出: <Buffer 01 02 03 04 05>
console.log(copy);

                    

                                                                //concatenate buffers
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString()); //buffer3 内容: 菜鸟教程www.runoob.com
                                                                

                                                                //compare buffers
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2); //compare buffer1 and buffer2
if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}
else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}
else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}


                                                                //copy buffer
var buffer1 = Buffer.from('abcdefghijkl');
var buffer2 = Buffer.from('RUNOOB');
//将 buffer2 插入到 buffer1 指定位置上
buffer2.copy(buffer1, 2); //buffer2 will be copied to buffer1 from index 2
console.log(buffer1.toString()); //abRUNOOBijkl


                                                                //slice buffer  
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2); //buffer2 is a slice of buffer1 from index 0 to index 2
console.log("buffer2 content: " + buffer2.toString()); //ru



//buffer length
var buffer = Buffer.from('www.runoob.com');
console.log("buffer length: " + buffer.length); //buffer length: 14


//---------------------------------------------------------Nodejs buffer--------------------------------------------------------------





//---------------------------------------------------------Node Utils--------------------------------------------------------------

//util module is used to access some utility functions. It is a core module.
const util = require('node:util');

//check function here : https://nodejs.org/api/util.html

//---------------------------------------------------------Node Utils--------------------------------------------------------------
