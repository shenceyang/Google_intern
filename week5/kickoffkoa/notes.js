
/* e1
Create a koa server that listens on a port passed from the command line and replies with "hello koa" when an HTTP GET 
request is sent to /hello.
*/
var Koa = require('koa');
var app = new Koa();


app.use(async ctx => {
    console.log(ctx.url);
    console.log(ctx.method);
    if (ctx.path === '/hello' && ctx.method === 'GET') {
      ctx.body = 'hello koa';
    }else{
        ctx.body = 'Page not found';
    }
  });

const port = process.argv[2] || 3000; // Default to 3000 if no port is provided
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });







/* e2
Create a koa server that listen on a port passed from the command line, and returns the following responses from the following routes:

    /    - hello koa
    /404 - page not found
    /500 - internal server error


*/

app.use(function* (next) {
  if (this.path !== '/') {
    return yield next;
  }
  this.body = 'hello koa';
});

app.use(function* (next) {
  if (this.path !== '/404') {
    return yield next;
  }
  this.body = 'page not found';
});

app.use(function* (next) {
  if (this.path !== '/500') {
    return yield next;
  }
  this.body = 'internal server error';
});




/* e3
Create a koa server which parse the post data, Convert the name field to
upper case and respond to client.

If you get this:

    POST / with { name: 'koa' }

Respond with:

    KOA

*/

app.use(async ctx =>{
  if (ctx.url === '/' && ctx.method === 'POST'){
      const body = await parse(ctx);
      // Check if 'name' field exists and respond accordingly
      if (body.name) {
          const name = body.name.toUpperCase();
          ctx.body = name;
      } else {
          ctx.status = 400;
          ctx.body = 'Name field is required';
        }
  } else {
        
      ctx.status = 404;
      ctx.body = 'Not Found';
  }
});
  
//OR
app.use(function* (next) {
  // only accept POST request
  if (this.method !== 'POST') return yield next;

  // max body size limit to `1kb`
  var body = yield parse(this, { limit: '1kb' });

  // if body.name not exist, respond `400`
  if (!body.name) this.throw(400, '.name required');

  this.body = body.name.toUpperCase();
});


/* e4
Create an app that returns a stream when the client requests /stream and a JSON body when the client requests /json.

When /json is requested, the output should be

    { foo: 'bar' }

When /stream is requested, the server should respond with the content in file process.argv[3]. Use fs.createReadStream:

    fs.createReadStream(process.argv[3]);
*/

app.use(async ctx =>{
  if (ctx.path ==='/json'){
      ctx.type = 'application/json';
      ctx.body = {foo: 'bar'};

  }else if (ctx.path === '/stream'){
      ctx.type = 'application/octet-stream';
      ctx.body = fs.createReadStream(process.argv[3]);
  }
  
});


//OR
app.use(function *(next) {
  if (this.path !== '/json') {
    return yield next;
  }

  this.body = { foo: 'bar' };
});

app.use(function *(next) {
  if (this.path !== '/stream') {
    return yield next;
  }

  this.body = fs.createReadStream(process.argv[3]);
});
  





/* e5
Create an app that checks the Content-Type of the request. If it's application/json, return {message: 'hi!'}
with appropriate content headers. Otherwise, return ok as a string.
*/

app.use(async ctx => {
  // Check the Content-Type of the incoming request
  if (ctx.is('application/json')) {
    // If the Content-Type is application/json, set the response type to JSON
    // and send a JSON object as the response
    ctx.type = 'application/json';
    ctx.body = {message: 'hi!'};
  } else {
    // For any other Content-Type, respond with 'ok' as a plain text
    ctx.type = 'text/plain';
    ctx.body = 'ok';
  }
});

//OR

app.use(function* () {
  this.body = this.request.is('json')
    ? { message: 'hi!' }
    : 'ok';
});








/* e6

Complete the Koa application below, finish two middlewares:

  * responseTime: record each request's response time(ms), set the response header `X-Response-Time`.
  * upperCase: convert response body to upper case.

 */   