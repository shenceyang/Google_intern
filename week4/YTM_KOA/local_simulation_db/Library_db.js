'use strict';

const fs = require('fs');
const mm = require('music-metadata');
const path = require('path');

const crypto = require('crypto');

function generateTrackId(artist, title, album) {
  return crypto.createHash('md5').update(`${artist}${title}${album}`).digest('hex').substring(0, 16);
}

async function librayInit(libpath){

    //validate the path 
    if (!fs.existsSync(libpath)){
        console.log("The path is not valid");
        return;
    }

    var file_info= [];

    try{
        var files = fs.readdirSync(libpath);
        for (const file of files){
        
            //fetch metdata
            var filepath = path.join(libpath, file);
            const metadata = await mm.parseFile(filepath);
            
            console.log(metadata);
            
            //extract the tag information
            const trackData = {
                track_id: generateTrackId(metadata.common.artist || 'Unknown Artist', metadata.common.title || 'Unknown Title', metadata.common.album || 'Unknown Album'),
                title: metadata.common.title || 'Unknown Title',
                artist: metadata.common.artist ? [metadata.common.artist] : ['Unknown Artist'], // Assuming single artist; modify if multiple
                album: metadata.common.album || 'Unknown Album',
                album_id: generateTrackId(metadata.common.albumArtist || metadata.common.artist || 'Unknown Artist', '', metadata.common.album || 'Unknown Album'),
                genre: metadata.common.genre ? metadata.common.genre.join(', ') : 'Unknown Genre',
                copyright: metadata.common.copyright || 'Not Available',
                length: metadata.format.duration ? `${Math.floor(metadata.format.duration)} seconds` : 'Unknown Length',
                track_number: metadata.common.track.no || 0,
                quality: metadata.format.codecProfile || 'STD',
                file: filePath
              };
              flle_info.push(trackData);
        }




    }catch(err){
        console.log(err);
    }

    fs.writeFileSync(path.join(libpath, 'index.json'), JSON.stringify(file_info, null, 2));
    
}

module.exports = librayInit;