
const Router = require('koa-router');
const path = require('path');
const router = new Router();
const koaMedia = require("./core/stream_audio.js");
const login = require('./core/auth.js').login;
const signup = require('./core/auth.js').signup;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {readTrackIndex} = require('./database/dbconnection.js');



const jwtSecret = 'YTM';

//jwt auth middleware
const jwtAuth = async (ctx, next) => {
  const token = ctx.cookies.get('auth_token');
  if (token) {
      try {
          ctx.state.user = jwt.verify(token, jwtSecret);
          await next();
          
      } catch (err) {
          ctx.status = 401;
          ctx.body = 'Unauthorized: invalid token';
      }
  } else {
      ctx.status = 401;
      ctx.body = 'Unauthorized: no token provided';
  }
}

router.post('/login', async ctx => {
  await login(ctx.request.body.username, ctx.request.body.password).then((result) => {
      if (result) {
          //set cookie
          const token = jwt.sign({username: ctx.request.body.username}, jwtSecret, {expiresIn: '1h'})
          ctx.cookies.set('auth_token', token, {httpOnly: true, maxAge: 60 * 60 * 1000})
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 0, msg: 'Login Success', token: token})
      } else {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 1, msg: 'Username or Password incorrect'})
      }
  })
})


router.post('/signup', async ctx => {

  await signup(ctx.request.body.username, ctx.request.body.password).then((result) => {
     
      if (result) {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 0, msg: 'Signup Success'})
      } else {
          ctx.type = 'json'
          ctx.body = JSON.stringify({status: 1, msg: 'Username already exists'})
      }
  })
})



// getUser route
router.get('/getuser', jwtAuth, async (ctx) => {
  // Extract the username from the state.user, which was set by the jwtAuth middleware
  const { username } = ctx.state.user;
  ctx.body = { username };
});


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



//explore:get all music file in the library
router.get('/explore', jwtAuth, async (ctx, next) => {
  const trackIndex = await readTrackIndex();
  ctx.type = 'json';
  ctx.body = JSON.stringify(trackIndex);
  await next();
});

module.exports =  router
