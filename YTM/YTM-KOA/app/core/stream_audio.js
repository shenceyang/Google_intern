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

    let match = ctx.request.header['range'];
    let ext = path.extname(ctx.path).toLowerCase().slice(1);
    let diskPath = decodeURI(path.resolve(ctx.path));
    let bytes = match.split('=')[1]
    let stats = fs.statSync(diskPath);
    let start = Number.parseInt(bytes.split('-')[0]) 
    let end   = Number.parseInt(bytes.split('-')[1]) || (stats.size - 1)

    if (stats.isFile()){

        return new Promise((resolve, reject) => {

            let stream = fs.createReadStream(diskPath, {start, end});

            ctx.res.on('close', () => {
                stream.destroy();
            })

            ctx.set('Content-Range', `bytes ${start}-${end}/${stats.size}`);
            ctx.set('Accept-Ranges', 'bytes');
            ctx.status = 206;
            ctx.type = getContentType(ext.replace('.',''))

            stream.on('open', function(length) {
                if (ctx.res.socket.writable) {
                    try {
                        console.log("stream")
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


    let options = Object.assign({
        extMatch:['.mp4', '.flv', '.webm', '.ogv', '.mpg', '.wav', '.ogg'],
        //root is media folder (change) WIP
        root: path.join(__dirname,'..','..','library', 'media')
    }, opts);

    return async (ctx,next) => {
    
        let ext = path.extname(ctx.path).toLocaleLowerCase();
        let isMatchArr = options.extMatch instanceof Array && options.extMatch.indexOf(ext) > -1
        let isMatchReg = options.extMatch instanceof RegExp && options.extMatch.test(ctx.path)
     
        if (isMatchArr || isMatchReg) {          
            if (ctx.request.header && ctx.request.header['range']) {
                return await readFile(ctx, options)            
            }       
        }
        await next()
    }
}

