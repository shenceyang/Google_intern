<!-- SearchTrack.vue -->
<template>
    <v-container class="search-container">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="trackSearch"
            append-icon="mdi-magnify"
            label="Search albums, songs, or artists"
            single-line
            hide-details
            @keyup.enter="searchTrackByPid"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
    import axios from 'axios';
  export default {
    data() {
      return {
        trackSearch: '',
        error: null
      };
    },
    methods: {
      async searchTrackByPid() {
       
        if (!this.trackSearch.trim()) {
        alert('Please enter a album to search for.');
        return;
        }

        try {
            let response = await axios.get(`http://localhost:3000/album/${this.trackSearch}`, { withCredentials: true });
            
            if (response.data && response.data.length>0) {
           
                let tracks = response.data;
                console.log('tracks in the searchAlbum page:', tracks);
                this.$router.push({ name: 'result', query: { tracks: JSON.stringify(tracks) } });


            } else if (response.data && response.data.message) {

                // no album then search for song
                response = await axios.get(`http://localhost:3000/songs/${this.trackSearch}`, { withCredentials: true });
                if (response.data && response.data.length>0) {
                  let tracks = response.data;
                  this.$router.push({ name: 'result', query: { tracks: JSON.stringify(tracks) } });
                } else if (response.data && response.data.message) {
                 

                  //search for artist
                  response = await axios.get(`http://localhost:3000/artists/${this.trackSearch}`, { withCredentials: true });
                  if (response.data && response.data.length>0) {
                    let tracks = response.data;
                    this.$router.push({ name: 'result', query: { tracks: JSON.stringify(tracks) } });
                  } else if (response.data && response.data.message) {
                    alert('No results found');
                  }

                }
               
            }
          
        } catch (error) {
            console.error('Error searching for track by PID:', error);
            this.searchResults = [];
            this.error = 'Failed to fetch tracks. Please try again later.';
        }
     
      },
    },
  };
  </script>
  
<style scoped>

</style>
