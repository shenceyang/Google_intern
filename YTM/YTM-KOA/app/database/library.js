const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { isMainThread, parentPort, Worker, workerData } = require('worker_threads');
const {parseFile} = require('music-metadata');
const sharp = require('sharp');
const { readTrackIndex,writeTrackIndex } = require('./dbconnection');


/*
//mongodb only allow single thread for write operation, so we need to use async-mutex to lock the write operation 
const { Mutex } = require('async-mutex');
const mutex = new Mutex();
*/

//helper function in trackInfo
function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


//extract track infor from music file
async function trackInfo(filePath) {
    const metadata = await parseFile(filePath)
    const common = metadata.common
    const format = metadata.format
    //generate unique identifiers for a track and an album
    const track_id = crypto.createHash('md5').update(`${common.artist}${common.title}${common.album}`).digest('hex').substring(0, 16)
    const album_id = crypto.createHash('md5').update(`${common.album}`).digest('hex').substring(0, 16)

    const track = {
        track_id,
        title: common.title || '',
        artist: common.artists || '',
        album: common.album || '',
        album_id,
        genre: common.genre ? common.genre.join(', ') : '',
        copyright: common.copyright || '',
        length: format.duration ? formatDuration(format.duration) : '',
        track_number: common.track.no || 0,
        quality: "STD",
        file: filePath,
        fileName: path.basename(filePath).toLowerCase(),
    }

    var picture = undefined
    if (common.picture && common.picture[0]) {
        picture = common.picture[0]
    }
    return {track, picture}
}


/*
//avoid conflicts between multiple threads writing to the same file
async function safeWriteTrackIndex(track) {
    const release = await mutex.acquire();
    try {
      await writeTrackIndex(track);
    } finally {
      release();
    }
  }
  */

//store track info to db
async function indexCreate(filePath) {
    const {track, picture} = await trackInfo(filePath)

    //console.log(track)

    //save track info to db
    //await safeWriteTrackIndex(track)

    const test = {
        track_id: 'b09fc431ba78e240',
        title: 'Kanye',
        artist: [ 'The Chainsmokers' ],
        album: 'Kanye',
        album_id: '3f8c0316bb7a001f',
        genre: '',
        copyright: '',
        length: '03:40',
        track_number: 1,
        quality: 'STD',
        file: '/Users/yangshence/Desktop/Google_intern/YTM/YTM-KOA/local_storage/Kanye.Created.With.Ytmdl.mp3',
        fileName: 'kanye.created.with.ytmdl.mp3',
      }

    await writeTrackIndex(test)
    /*
    //save album cover to library/cover
    if (picture) {
        const imageData = picture.data
        //Sharp can directly store the image to jpeg
        await sharp(imageData)
        .jpeg({quality: 100})
        .toFile(`./library/cover/${track.album_id}.jpg`)
        console.log(`Album cover for ${track.album} saved`)
    }
    */
}


//------------------------------------------Parallel processing of LibraryInit------------------------------------------

//number of CPU cores available on the system where the script is running 
const LIMIT = os.cpus().length

if (!isMainThread) {
    /* Worker threads can receive data through workerData and 
    it checks the action property of the workerData object to determine what to do. */
    if (workerData.action === 'init') {
        libraryInit(workerData.args)
    }
}

// use paralell processing to run indexCreate function to every musicfile in the path
async function libraryInit(Path){

    if (isMainThread) {
        //main thread: create worker threads and send file paths to worker threads to let them run indexCreate function

        const files = fs.readdirSync(Path)
        const musicFiles = files.filter(file => file.endsWith('.mp3') || file.endsWith('.flac') || file.endsWith('.m4a') || file.endsWith('.wav'))
        console.log(`Found ${musicFiles.length} music files`)
        const workers = []

       //create worker threads
        for (let i = 0; i < LIMIT; i++) {

            //Initializes the code that worker thread runs(__filename) and initialzie the workerData for each work thread 
            const worker = new Worker(__filename, 
                {
                    workerData: {
                        action: 'init',
                        args: [Path]
                    }
                })
            workers.push(worker)


            /*  set up a message event listener for main thread:  handle the msg received from worker thread.
                    - when main thread received the msg that worker thread sent 'done', 
                      run call back function to put next file into message and pass it to worker thread. 
            */
            worker.on('message', () => {
                console.log("here music file length is " + musicFiles.length)
                if (musicFiles.length > 0) {
                    worker.postMessage(path.join(Path, musicFiles.pop()))
                  
                } else {
                    console.log('All music files processed')
                    worker.terminate()
                    workers.pop()
                    console.log('hey')
                }
            })
            worker.postMessage(path.join(Path, musicFiles.pop()))
        }
    }
    else{
        /*
         worker thread: main thread will send filepath of musicfile as message to the worker thread,
                        worker thread need to run indexCreate function with the musicfile.

            -> set up a message event listener to process the musicFileafter receiving the message(filePath) from main thread.
        */

        parentPort.on('message', async filePath => {
            //store track info to db
            await indexCreate(filePath)

            //send done message to main thread after processing the music file
            parentPort.postMessage('done')
        })
    }
}


//------------------------------------------Parallel processing of LibraryInit------------------------------------------



async function libraryLoad(){
    const files = await readTrackIndex()
    const indexObj = Object.fromEntries(files.map(item => [item.track_id, item]))
    return indexObj
}








module.exports= {libraryInit,libraryLoad}