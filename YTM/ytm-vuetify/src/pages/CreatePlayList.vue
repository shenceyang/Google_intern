<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">New Playlist</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newPlaylist.name"
            label="Title"
            autofocus
            required
          ></v-text-field>
          <v-text-field
            v-model="newPlaylist.description"
            label="Description"
            required
          ></v-text-field>
          <v-select
            v-model="newPlaylist.public"
            :items="['Public', 'Private']"
            label="Privacy"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createPlaylist">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="primary" @click="openDialog">Create Playlist</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      newPlaylist: {
        author: '',
        name: '',
        description: '',
        public: 'Public'
      }
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },

    async createPlaylist() {
      const response = await axios.get('http://localhost:3000/getuser', { withCredentials: true });
      const username = response.data.username;
      const uidres = await axios.get(`http://localhost:3000/user/${username}`, { withCredentials: true });
      const uid = uidres.data;
      
      const playlistToSave = {
        author: uid,
        name: this.newPlaylist.name,
        description: this.newPlaylist.description,
        public: this.newPlaylist.public === 'Public'
      };
      //save playlist to db   
      await axios.post('http://localhost:3000/playlist', playlistToSave,{ withCredentials: true });

      //jump to the playlist page
      this.$router.push('/playlist');
  }
  }
};
</script>
