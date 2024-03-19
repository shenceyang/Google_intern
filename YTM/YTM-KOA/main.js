const Koa = require('koa');
const router  = require('./app/router.js')
const app = new Koa()
const connectCluster = require('./app/database/clusterConnection.js')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const path = require('path');
const {readTrackIndex} = require('./app/database/dbconnection.js');
const {libraryInit} = require('./app/database/library.js');




const localStorage = path.join(__dirname, 'local_storage'); 
(async () => {
    await connectCluster();
    if ((await readTrackIndex()).length !== 0) {
      //update 
      console.log('already initialized')
    } else {
      await libraryInit(localStorage)
    }
})();



app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods())

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
