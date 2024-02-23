"use strict";
const Track = require("./Track");

class MusicTrack extends Track {
  constructor(name,artist,genre,Album,Composer,Lyricist,Duration){
    super(name,artist);
    this.genre=genre;
    this.Album=Album;
    this.Composer=Composer;
    this.Lyricist=Lyricist;
    this.Duration=Duration;
  }

   showDetails(){
    console.log("Name: "+this.name);
    console.log("Artist: "+this.artist);
    console.log("Genre: "+this.genre);
    console.log("Album: "+this.Album);
    console.log("Composer: "+this.Composer);
    console.log("Lyricist: "+this.Lyricist);
    console.log("Duration: "+this.Duration);
   }
}

module.exports = MusicTrack;