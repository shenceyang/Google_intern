const MusicTrack = require("./MusicTrack");
const PlayList = require("./PlayList");

class MusicPlayList extends PlayList{
    constructor(){
        super();
    }

    add(track,position){
        if (!track instanceof MusicTrack) {
            throw new Error("Not a MusicTrack!");
        }
        this.tracks.splice(position,0,track);

    }

    remove(position){
        //check if position is valid
        if(position<0 || position>this.tracks.length){
            throw new Error("Invalid position!");
        }
        this.tracks.splice(position,1);
    }

    showDetails(){
        for(let i=0;i<this.tracks.length;i++){
            console.log("Track "+(i+1)+":");
            this.tracks[i].showDetails();
        }
    }
}
module.exports = MusicPlayList;