const Koa = require('koa');
const router  = require('./app/router.js')
const app = new Koa()


app.use(router.routes()).use(router.allowedMethods())


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
