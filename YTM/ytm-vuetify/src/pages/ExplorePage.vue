<template>
  <v-container fluid class="explore-page">
    <!-- User Greeting -->
    <user-greeting></user-greeting>
    
    <!-- Tracks Display -->
    <v-row>
      <v-col
        cols="12"  md="6"
        v-for="track in tracks"
        :key="track.track_id"
        class="mb-4"
      >
        <v-card class="track-card" elevation="2">
          <!-- Image container -->
          <div class="image-container">
            <img
              :src="getCoverImagePath(track.track_id)"
              alt="Cover image"
              class="cover-image"
            >
          </div>
          <!-- Text content -->
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
/* Adjust the column layout */
.v-col {
  max-width: 33.33333%; /* Three columns in a row for md and up */
}


.explore-page {
  background: black; /* White background for the page */
}

.track-card {
  max-width: 100%; /* Use this to control the width of the card */
  margin: auto; /* Center the card if it's narrower than the column width */
  box-shadow: 2px 2px 10px rgba(249, 249, 249, 0.1); /* Optional: Adds some shadow for depth */
  border-radius: 4px; /* Optional: Rounds the corners */
  overflow: hidden; /* Ensures the content fits within the rounded corners */
}
.image-container {
  height: 200px; /* Set a fixed height or use 'auto' to keep the aspect ratio */
  width: 100%;
  background-color: #000; /* A dark background if the image doesn't cover the area */
  display: flex;
  justify-content: center;
  align-items: center;
}

.cover-image {
  max-height: 100%; /* Ensure the image fits in the container */
  object-fit: contain; /* Contain the image to prevent cropping */
}

.text-content {
  padding: 16px;
  text-align: center; /* Center the text */
  background-color: #000; /* Background color for the text */
  color: #fff; /* Text color */
}

.song-name {
  font-size: 1.2em; /* Adjust the font size as necessary */
}

.artist-name {
  font-size: 1em; /* Adjust the font size as necessary */
}
</style>