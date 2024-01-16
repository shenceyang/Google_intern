
/*------------------------Event driven program-------------------------------
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
//------------------------Event driven program-------------------------------



//read file
var fs = require("fs");
fs.readFile('input.txt', function (err, data) {
   if (err){
      console.log(err.stack);
      return;
   }
   console.log(data.toString());
});
console.log("程序执行完毕");


//----------------------------------------EventEmitter-------------------------------------
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

//-----------------------------------------EventEmitter-------------------------------------
