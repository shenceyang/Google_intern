'use strict';

const fs = require('fs');
const mm = require('music-metadata');
const path = require('path');

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
        }




    }catch(err){
        console.log(err);
    }

    
}

librayInit('/Users/yangshence/Desktop/Google_intern/week4/YTM_KOA/Library').then(() => console.log('Library initialized'))