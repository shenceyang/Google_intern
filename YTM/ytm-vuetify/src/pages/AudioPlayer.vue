<template>
  <div>
    <button v-if="!userInteracted" @click="userHasInteracted">Play</button>
    <v-audio-player
      v-if="track && userInteracted"
      :src="audioSrc"
      :track-title="track.title"
      :track-subtitle="getTrackSubtitle(track)"
      :album-art="coverPic"
      :autoplay="false"
      :compact="compactMode"
      prev-track-icon="mdi-skip-previous"
      next-track-icon="mdi-skip-next"
      back-forward-icon="mdi-rewind-5"
      fast-forward-icon="mdi-fast-forward-5"
      play-icon="mdi-play"
      pause-icon="mdi-pause"
      mute-volume-icon="mdi-volume-off"
      low-volume-icon="mdi-volume-low"
      medium-volume-icon="mdi-volume-medium"
      high-volume-icon="mdi-volume-high"
    ></v-audio-player>
  </div>
</template>

<script>
import axios from 'axios';
import VAudioPlayer from '@woodydark/vuetify-audio-player';
import '@mdi/font/css/materialdesignicons.min.css';


export default {
  components: {
    VAudioPlayer,
  },
  props: {
    trackId: String,
  },
  data() {
    return {
      track: null,
      audioSrc: '',
      coverPic: '',
      userInteracted: false,
      compactMode: false, // Determine compact mode based on window width or other logic
    };
  },
  created() {
    this.fetchTrackDetails();
  },
  mounted() {
    // Since $vuetify might not be available in all lifecycle hooks, we're using a different method to set compact mode.
    this.setCompactMode();
    // Ensure the event listeners are cleaned up when the component is destroyed
    window.addEventListener('resize', this.setCompactMode);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setCompactMode);
  },
  methods: {
    async fetchTrackDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/explore`);
        const tracks = response.data;
        this.track = tracks.find((t) => t.track_id === this.trackId);
        if (this.track) {
          this.audioSrc = `http://localhost:3000/stream/${this.trackId}`;
          this.coverPic = `http://localhost:3000/cover/${this.trackId}.jpg`;
          console.log(this.coverPic)
        } else {
          console.error('Track not found');
        }
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
      }
    },
    userHasInteracted() {
      this.userInteracted = true;
    },
    setCompactMode() {
      // Example logic for compact mode - adjust as necessary
      this.compactMode = window.innerWidth < 600;
    },
    getTrackSubtitle(track) {
      return track.artist?.join(', ') || 'Unknown Artist';
    }
  },
};
</script>
