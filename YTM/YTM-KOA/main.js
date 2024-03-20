const Koa = require('koa');
const router  = require('./app/router.js')
const app = new Koa()
const connectCluster = require('./app/database/clusterConnection.js')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const path = require('path');
const {readTrackIndex,writeTrackIndex} = require('./app/database/dbconnection.js');
const {libraryInit} = require('./app/database/library.js');


/*
connectCluster();

const track = {
  track_id: '4b054b40aa48e992',
  title: '',
  artist: '',
  album: '',
  album_id: '5e543256c480ac57',
  genre: '',
  copyright: '',
  length: '05:01',
  track_number: 0,
  quality: 'STD',
  file: '/Users/yangshence/Desktop/Google_intern/YTM/YTM-KOA/local_storage/周杰倫 Jay Chou【一路向北 All the Way North】-Official Music Video (320 kbps).mp3',
  fileName: '周杰倫 jay chou【一路向北 all the way north】-official music video (320 kbps).mp3'
}

console.log('writing track index');

(async () => {
  await writeTrackIndex(track);
  const data = await readTrackIndex();
  console.log(data);
}
)();
*/



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
