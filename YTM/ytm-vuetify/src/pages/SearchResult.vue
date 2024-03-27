<template>
  <v-container fluid class="search-results-page">
    <!-- SearchAlbum Component (optional, if you want to include it here as well) -->
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
            <div class="song-name">Song name: {{ track.title || track.fileName }}</div>
            <div class="artist-name">Artist: {{ track.artist.join(', ') || 'Unknown Artist' }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    tracks: Array
  },
  created() {
    if (!this.tracks || this.tracks.length === 0) {
      console.log('No tracks to display.');
      alert('No tracks to display.');
      // Optionally, redirect back
      // this.$router.push({ name: 'home' });
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
/* Use the same styles as your explorepage component */
.search-results-page {
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
