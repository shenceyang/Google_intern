const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const koaMedia = require('./media/stream_audio.js');
const app = new Koa();
const router = new Router();


router.get('/stream/:trackId', async (ctx, next) => {

  const trackId = ctx.params.trackId;
  const filePath = path.join(__dirname, 'media', `${trackId}.mp4`);
  console.log(filePath);

  ctx.path = filePath;
  ctx.request.header['range'] = 'bytes=0-';

  await koaMedia({
    extMatch: /\.mp[3-4]$/i,
  })(ctx); 

  await next();

  //stream the mp3 file at filepath with the koaMedia Middleware
});

// Use the routes defined in the router
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
