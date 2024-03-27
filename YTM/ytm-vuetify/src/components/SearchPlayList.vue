<!-- SearchPlaylist.vue -->
<template>
    <v-container class="search-container">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="playlistSearch"
            append-icon="mdi-magnify"
            label="Search your playlists by PID"
            single-line
            hide-details
            @keyup.enter="searchUserPlaylistByPid"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        playlistSearch: '',
      };
    },
    methods: {
      async searchUserPlaylistByPid() {
        // Implement the logic to search for a playlist by PID here
        console.log('Searching for playlist with PID:', this.playlistSearch);
        // You can make an axios call here to your backend
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles here */
  </style>
  