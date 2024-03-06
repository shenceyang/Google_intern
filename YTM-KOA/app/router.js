
const Router = require('koa-router');
const path = require('path');
const router = new Router();
const koaMedia = require("./core/stream_audio.js");

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

module.exports =  router
