const fs = require('fs');
const path = require('path');

//set up MIIME types dictionary:
const mime = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'application/ogg',
    'ogv': 'video/ogg',
    'mpg': 'video/mpeg',
    'flv': 'flv-application/octet-stream',
    'mp3': 'audio/mpeg',
    'wav': 'audio/x-wav'
};

//create a function to get the content type
let getContentType = (type) => {
    if (mime[type]) {
        return mime[type];
    } else {
        return null;
    }
};


//read file
let readFile = async (ctx, options) => {

    //get range from header
    let match = ctx.request.header['range'];
    console.log('match', match);

    //file extension
    let ext = path.extname(ctx.path).toLowerCase().slice(1);
    
    // full file path on the server
    let diskPath = decodeURI(path.resolve(options.root + ctx.path));
    
    //get the start and end position of the file
    let bytes = match.split('=')[1]

    //synchronously get the statistics of the file at the path 
    let stats = fs.statSync(diskPath);

    let start = Number.parseInt(bytes.split('-')[0]) 
    let end   = Number.parseInt(bytes.split('-')[1]) || (stats.size - 1)

    if (stats.isFile()){
        return new Promise((resolve, reject) => {
            //create a readable stream
            let stream = fs.createReadStream(diskPath, {start, end});

            //listen for the close event
            ctx.res.on('close', () => {
                stream.destroy();
            })

            //set response headers
            ctx.set('Content-Range', `bytes ${start}-${end}/${stats.size}`);
            ctx.set('Accept-Ranges', 'bytes');

            //return status 
            ctx.status = 206;

            //set returned content type
            ctx.type = getContentType(ext.replace('.',''))

            stream.on('open', function(length) {
                if (ctx.res.socket.writeable) {
                    try {
                        stream.pipe(ctx.res)
                    } catch (e) {
                        stream.destroy()
                    }
                } else {
                    stream.destroy()
                }
            })


            stream.on('error', function(err) {
                if (ctx.res.socket.writable) {
                   try {
                       ctx.body = err
                   } catch (e) {
                       stream.destroy()
                   }
               }
               reject()
           })

           stream.on('end', function () {
            resolve()
        })



        });
    }

  
};



module.exports = function (opts){


    //combine default settings with any options passed into the module when it's required
    let options = Object.assign({
        extMatch:['.mp4', '.flv', '.webm', '.ogv', '.mpg', '.wav', '.ogg'],
        root: path.join(__dirname, 'media'),
    }, opts);


    console.log("options", options)


    return async (ctx,next) => {
        console.log("ctx path is" +ctx.path)
        //get file extname
        let ext = path.extname(ctx.path).toLocaleLowerCase();

        //checks whether the requested file's extension matches the ones specified in the extMatch array or the extMatch regular expression.
        let isMatchArr = options.extMatch instanceof Array && options.extMatch.indexOf(ext) > -1
        let isMatchReg = options.extMatch instanceof RegExp && options.extMatch.test(ctx.path)

        console.log(options.extMatch instanceof RegExp)
        console.log (options.extMatch.test(ctx.path))
        console.log("isMatchArr", isMatchArr)
        console.log("isMatchReg", isMatchReg)
     
        if (isMatchArr || isMatchReg) {
            console.log("here")

            if (ctx.request.header && ctx.request.header['range']) {
                console.log(options)

                return await readFile(ctx, options)
                
            //}
        } 
        //await next()
        
    }

    }
}