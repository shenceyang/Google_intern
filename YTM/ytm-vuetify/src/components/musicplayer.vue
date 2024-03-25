<template>
    <v-audio-player
      :src="trackUrl"
      :track-title="trackTitle"
      :track-subtitle="trackSubtitle"
      :album-art="albumArt"
      :allow-previous="true"
      :allow-next="true"
      :compact="$vuetify.breakpoint.smAndDown"
      @next-audio="nextTrack"
      @previous-audio="previousTrack"
    ></v-audio-player>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTrackIndex: 0,
        tracks: [], // This will be filled with track data from your backend
        trackUrl: '',
        trackTitle: '',
        trackSubtitle: '',
        albumArt: ''
      };
    },
    async created() {
      await this.fetchTracks();
      this.setTrack(this.currentTrackIndex);
    },
    methods: {
      async fetchTracks() {
        // Fetch track data from your backend
        try {
          const response = await this.$http.get('/explore'); // Adjust this to match your API endpoint
          this.tracks = response.data;
        } catch (error) {
          console.error('Error fetching tracks:', error);
        }
      },
      setTrack(index) {
        const track = this.tracks[index];
        this.trackUrl = `http://localhost:3000/stream/${track.track_id}`; // Adjust the URL to match your streaming endpoint
        this.trackTitle = track.title;
        this.trackSubtitle = track.artist.join(', '); // Assuming 'artist' is an array
        this.albumArt = track.albumArt; // Ensure your track data includes an 'albumArt' URL
      },
      nextTrack() {
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.currentTrackIndex++;
          this.setTrack(this.currentTrackIndex);
        }
      },
      previousTrack() {
        if (this.currentTrackIndex > 0) {
          this.currentTrackIndex--;
          this.setTrack(this.currentTrackIndex);
        }
      }
    },
    components: {
    // Register the Vuetify Audio Player component for use in this component
    VAudioPlayer: () => import("@woodydark/vuetify-audio-player"),
  }
  };
  </script>
  