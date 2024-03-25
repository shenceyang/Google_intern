<template>
  <v-container fluid class="explore-page">
    <!-- User Greeting -->
    <user-greeting></user-greeting>
    
    <!-- Tracks Display -->
    <v-row>
      <v-col
        cols="12" sm="6" md="4"
        v-for="track in tracks"
        :key="track.track_id"
        class="mb-4"
      >
        <v-card @click="playTrack(track.track_id)"  class="track-card" elevation="2">

            <div class="image-container">
              <img
                :src="getCoverImagePath(track.track_id)"
                alt="Cover image"
                class="cover-image"
              >
            </div>

            <div class="text-content">
              <div class="song-name">Song name: {{ track.title || track.fileName }}</div>
              <div class="artist-name">Artist: {{ track.artist.join(', ') || 'Unknown Artist' }}</div>
            </div>
            
        </v-card>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import UserGreeting from '../components/UserGreeting.vue'; // Make sure this path is correct

export default {
  components: {
    UserGreeting
  },
  data() {
    return {
      tracks: [],
    };
  },
  async created() {
    await this.fetchTracks();
  },
  methods: {
    playTrack(trackId) {
      this.$router.push({ name: 'audioPlayer', params: { trackId } });
    },

    async fetchTracks() {
      try {
        const response = await axios.get('http://localhost:3000/explore', { withCredentials: true });
        this.tracks = response.data;
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    },
    getCoverImagePath(trackId) {
     const url = `http://localhost:3000/cover/${trackId}.jpg`;
     console.log(url); 
     return url;
    }
  },
};
</script>


<style scoped>

.v-col {
  max-width: 33.33333%; /* Three columns in a row for md and up */
}


.explore-page {
  background: black;
}

.track-card {
  max-width: 100%; 
  margin: auto; 
  box-shadow: 2px 2px 10px rgba(249, 249, 249, 0.1); 
  border-radius: 4px;
  border-color: #fff;
  overflow: hidden; 
}
.image-container {
  height: 200px;
  width: 100%;
  background-color: #000; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.cover-image {
  max-height: 100%; 
  object-fit: contain; 
}

.text-content {
  padding: 16px;
  text-align: center; 
  background-color: #000; 
  color: #fff;
}

.song-name {
  font-size: 1.2em; 
}

.artist-name {
  font-size: 1em;
}
</style>