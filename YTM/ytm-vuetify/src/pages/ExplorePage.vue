<template>
  <v-container class="explore-page">
    <!-- User Greeting -->
    <user-greeting></user-greeting>
    

    <!-- Tracks Display -->
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="track in tracks"
        :key="track.track_id"
      >
        <v-card>
          <img :src="getCoverImagePath(track.track_id)" height="200px">
          <v-card-title>{{ track.title || 'Untitled' }}</v-card-title>
          <v-card-subtitle>{{ track.artist.join(', ') || 'Unknown Artist' }}</v-card-subtitle>
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
.explore-page {
  background: #fff; /* or any color that fits the page's design */
  /* Add additional styles if needed */
}
</style>
