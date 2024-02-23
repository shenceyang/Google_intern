var koa = require('koa');
const parse = require('co-body');
var app =new koa();

const fs = require('fs');

// Middleware to record and set response time
function responseTime() {
    return function* (next) {
      var start = new Date(); // Record start time
      yield next; // Pass control to the next middleware
      var end = new Date(); // Record end time after all downstream middleware have finished
      var ms = end - start; // Calculate the duration in milliseconds
      this.set('X-Response-Time', `${ms}ms`); // Set the X-Response-Time header
    };
  }
  
  // Middleware to convert response body to upper case
  function upperCase() {
    return function* (next) {
      yield next; // Execute downstream middleware first
      if (typeof this.body === 'string') {
        this.body = this.body.toUpperCase(); // Convert the response body to upper case
      }
    };
  }


  app.use(responseTime());
  app.use(upperCase());
  // Route that sets the response body
  app.use(async ctx => {
    if (ctx.path === '/') {
      ctx.body = 'hello koa';
    } else {
      ctx.status = 404;
      ctx.body = 'Not Found'; // This will be converted to "NOT FOUND" by the upperCase middleware
    }
  });
  
  

app.listen(process.argv[2]);