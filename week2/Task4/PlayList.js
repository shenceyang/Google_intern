"use strict"

//abstract class
class PlayList{
    
    constructor(){
        if (this.constructor === PlayList) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.tracks=[];
    }

    add(track,position){
        throw new Error("Abstract method!");
    }

    remove(position){
        throw new Error("Abstract method!");
    }

}
module.exports = PlayList;