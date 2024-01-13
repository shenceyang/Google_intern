"use strict";

process.nextTick(() => {
    console.log('excute nextTick');
});

process.on('exit', (code) => {
    console.log('about to exit with code: ' + code);
}
);


//simulate async call to keep event loop busy
setTimeout(() => {
    console.log('This keeps the event loop busy.');
  }, 500);
  

console.log('excute immediately');
console.log("1")
console.log("2")
console.log("3")


/*  output in terminal
excute immediately
1
2
3
excute nextTick
This keeps the event loop busy.
about to exit with code: 0
*/