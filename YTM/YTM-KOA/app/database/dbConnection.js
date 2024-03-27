const connectCluster = require('./clusterConnection')
connectCluster();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

                                        //Library db connection (tracks)
const libraryDB = mongoose.connection.useDb('Library');
const trackSchema = new Schema({
    track_id: String,
    title: String,
    artist: Array,
    album: String,
    album_id: String,
    genre: String,
    copyright: String,
    length: String,
    track_number: Number,
    quality: String,
    file: String,
    fileName: String,
},
{collection: 'indexes'});
const Track = libraryDB.model('Index', trackSchema);

async function writeTrackIndex(trackInfo) {
    const trackDocument = new Track(trackInfo);
    //console.log(trackDocument)
    await trackDocument.save().catch(err => {
        console.log("failed to save track info to db")
        console.error(err)
    })
}

//return all tracks in the library
async function readTrackIndex() {
    const indexData = await Track.find().then((data) => {
        return data
    })
   
    return indexData
}


async function deleteTrackIndex(track_id) {
    await Track.deleteOne({track_id})
}








                                                //Playlists db connection
const playlistDB = mongoose.connection.useDb('Playlists');
const playListsIndexSchema = new Schema({
    pid: {
        type: String,
        required: true,
        unique: true
    },

    // owner of the playlist
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ensure this matches the name you've given your user model
        required: true
    },
    
    name: {
        type: String,
        required: true
    },
   
    description: String,

    // Tracks included in the playlist
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track' // Ensure this matches the name you've given your track model
    }],

    liked: {
        type: Number,
        default: 0
    },
    shared: {
        type: Number,
        default: 0
    },
    played: {
        type: Number,
        default: 0
    },
    public: {
        type: Boolean,
        required: true,
        default: true
    },
    image: String,
    type: {
        type: String,
        enum: ['playlist', 'album'],
        default: 'playlist'
    },
    last_update: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { collection: 'indexes' }); 
const playListsIndex = playlistDB.model('Index', playListsIndexSchema);


async function readPlaylistByPid(pid) {
    try {
        const playlist = await playListsIndex.findOne({ pid: pid }).exec();
        return playlist;
    } catch (error) {
        console.error('Error fetching playlist by PID:', error);
        throw error; // or handle it as needed
    }
}

async function readPlaylistsByUserId(userId) {
    try {
        const playlists = await playListsIndex.find({ author: userId }).exec();
        return playlists;
    } catch (error) {
        console.error('Error fetching playlists by User ID:', error);
        throw error; // or handle it as needed
    }
}




async function writeTrackIndex(trackInfo) {
    const trackDocument = new Track(trackInfo);
    //console.log(trackDocument)
    await trackDocument.save().catch(err => {
        console.log("failed to save track info to db")
        console.error(err)
    })
}


async function writePlaylist(playlistData) {
    try{
        console.log("hey im in writePlaylist")
        console.log(playlistData)
    
        const newPlaylist = new playListsIndex(playlistData);

        console.log(newPlaylist)

        await newPlaylist.save().catch(err => {
            console.log("failed to save playlist info to db")
            console.error(err)})
        } catch (error) {
            console.error('Error writing playlist to db:', error);
            throw error; // or handle it as needed
        }
    
}

async function updatePlaylistByPid(pid, updateData) {
    try {
        const updatedPlaylist = await playListsIndex.findOneAndUpdate({ pid: pid }, updateData, { new: true }).exec();
        if (updatedPlaylist) {
            console.log('Playlist updated successfully:', updatedPlaylist);
            return updatedPlaylist;
        } else {
            console.log('No playlist found with the given PID');
            return null; // or handle as needed
        }
    } catch (error) {
        console.error('Error updating playlist by PID:', error);
        throw error; // or handle it as needed
    }
}




module.exports = {writeTrackIndex, readTrackIndex, deleteTrackIndex,
                  readPlaylistByPid, readPlaylistsByUserId, writePlaylist, updatePlaylistByPid}