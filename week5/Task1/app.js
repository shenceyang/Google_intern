const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const mediaMiddleware = require('../Task1/stream_audio.js');

const app = new Koa();
const router = new Router();

// Middleware to serve mp3 files
const serveMP3 = mediaMiddleware({
  extMatch: /\.mp3$/i,
  root: path.join(__dirname, 'media','test.mp3')
});


router.get('/stream/:trackId', async (ctx, next) => {

  const trackId = ctx.params.trackId;
  console.log(`Streaming track ${trackId}`);

  // The request path is set to the track ID, required by the serveMP3 middleware
  ctx.path = trackId;
  
  await serveMP3(ctx, next);
  console.log('Finished streaming track');
});

// Use the routes defined in the router
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
