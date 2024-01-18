const MusicPlayList = require("./MusicPlayList");
const MusicTrack = require("./MusicTrack");

var playlist = new MusicPlayList();
var track1 = new MusicTrack("track1","artist1","genre1","Album1","Composer1","Lyricist1","Duration1");
var track2 = new MusicTrack("track2","artist2","genre2","Album2","Composer2","Lyricist2","Duration2");
var track3 = new MusicTrack("track3","artist3","genre3","Album3","Composer3","Lyricist3","Duration3");
var track4 = new MusicTrack("track4","artist4","genre4","Album4","Composer4","Lyricist4","Duration4");

//add tracks to playlist
playlist.add(track1,0);
playlist.add(track2,1);
playlist.add(track3,2);
playlist.add(track4,3);

//remove track2 from playlist
playlist.remove(1);

//show details of playlist
playlist.showDetails();

