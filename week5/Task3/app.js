const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

var stream = require('koa-stream');


 

router.get('/stream/:trackId', async (ctx, next) => {

    const trackId = ctx.params.trackId;
    const filePath = `${trackId}.mp4`; 
    const fileRoot = path.join(__dirname, 'media');
    console.log(filePath);
    console.log(fileRoot);

    await stream.file(ctx, filePath, { root: fileRoot });
    console.log("streaming")
    await next();

});

// Use the routes defined in the router
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

