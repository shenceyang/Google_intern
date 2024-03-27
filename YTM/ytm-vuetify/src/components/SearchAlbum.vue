<!-- SearchTrack.vue -->
<template>
    <v-container class="search-container">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="trackSearch"
            append-icon="mdi-magnify"
            label="Search tracks by PID"
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
        alert('Please enter a PID to search for.');
        return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/album/${this.trackSearch}`, { withCredentials: true });
            
            if (response.data && response.data.length>0) {
           
                const tracks = response.data;
                

                console.log('Received tracks:', tracks);

                //check if trakcs is an array
                console.log('Is tracks an array:', Array.isArray(tracks));

                //jump to search result ith the tracks data
                this.$router.push({ name: 'result', params: {tracks} });

            } else if (response.data && response.data.message) {
                alert(response.data.message);
                return;
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
  /* Styles here */
  </style>
  