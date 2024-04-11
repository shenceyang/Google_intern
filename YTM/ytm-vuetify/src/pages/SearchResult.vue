<template>
  <v-container fluid class="search-results-page">
    <!-- Optionally, you can include the SearchAlbum component here as well -->
    <!-- <search-album></search-album> -->

    <!-- Tracks Display -->
    <v-row>
      <v-col
        cols="12" sm="6" md="4"
        v-for="track in tracks"
        :key="track.track_id"
        class="mb-4"
      >
        <v-card @click="playTrack(track.track_id)" class="track-card" elevation="2">
          <div class="image-container">
            <img
              :src="getCoverImagePath(track.track_id)"
              alt="Cover image"
              class="cover-image"
            >
          </div>

          <div class="text-content">
            <div class="song-name">{{ track.title || track.fileName }}</div>
            <div class="artist-name">{{ track.artist.join(', ') || 'Unknown Artist' }}</div>
          </div>
        </v-card>
      </v-col>
      <v-col v-if="!tracks.length" cols="12">
        No tracks found.
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tracks: [],
    };
  },

  created() {
    if (this.$route.query.tracks) {
      try {
        this.tracks = JSON.parse(this.$route.query.tracks);
        console.log('Tracks in SearchResult:', this.tracks);
      } catch (e) {
        console.error('Error parsing tracks:', e);
        this.tracks = [];
        // Handle the error appropriately
      }
    }
  },
  
  methods: {
    playTrack(trackId) {
      this.$router.push({ name: 'audioPlayer', params: { trackId } });
    },
    
    getCoverImagePath(trackId) {
      return `http://localhost:3000/cover/${trackId}.jpg`;
    }
  }
};
</script>

<style scoped>
.search-results-page {
  background: black;
}
</style>
