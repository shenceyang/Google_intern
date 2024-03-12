
const Router = require('koa-router');
const path = require('path');
const router = new Router();
const koaMedia = require("./core/stream_audio.js");
const login = require('./core/auth.js').login;
const signup = require('./core/auth.js').signup;
const fs = require('fs');

router.get('/', async ctx => {
    ctx.body = 'Hello World'
})



router.get('/stream/:trackId', async (ctx, next) => {

  const trackId = ctx.params.trackId;
  const filePath = path.join(__dirname, '..','library', 'media',`${trackId}.mp4`);
  console.log(filePath);
  ctx.path = filePath;
  ctx.request.header['range'] = 'bytes=0-';

  await koaMedia({
    extMatch: /\.mp[3-4]$/i,
  })(ctx); 

  await next();

});


router.get('/login', async ctx => {
  // return the html file
  ctx.type = 'html'
  ctx.body = fs.createReadStream('./app/views/login.html')
}).post('/login', async ctx => {
  await login(ctx.request.body.username, ctx.request.body.password).then((result) => {
      if (result) {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 0, msg: 'Login Success'})
      } else {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 1, msg: 'Username or Password error'})
      }
  })
})


router.get('/signup', async ctx => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('./app/views/signup.html')
}).post('/signup', async ctx => {
  console.log(ctx.request.body.username, ctx.request.body.password)

  await signup(ctx.request.body.username, ctx.request.body.password).then((result) => {
      //console.log(result)
      console.log(ctx.request.body.username, ctx.request.body.password)

      if (result) {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 0, msg: 'Signup Success'})
      } else {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 1, msg: 'Username already exists'})
      }
  })
})



module.exports =  router
