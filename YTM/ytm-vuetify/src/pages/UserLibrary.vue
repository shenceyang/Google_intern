<template>
  <div class="library-page">

    <nav-bar></nav-bar>

    <h1>Your Playlists</h1>

    <div v-if="playlists.length > 0">
      <div class="playlist" v-for="playlist in playlists" :key="playlist.id">
        <h3>{{ playlist.name }}</h3>
        <!-- Add more details like cover image, number of songs etc. -->
      </div>
    </div>
    <div v-else>
      <p>No playlists found.</p>
    </div>


    <CreatePlayList></CreatePlayList>
    



  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
import CreatePlayList from '../pages/CreatePlayList.vue';

export default {
  components: {
    NavBar,
    CreatePlayList,
  },
  data() {
    return {
      playlists: [],
    };
  },

  async created() {
      await this.fetchPlaylists();
  },
  methods: {
    async fetchPlaylists() {

      const response = await axios.get('http://localhost:3000/getuser', { withCredentials: true });
      const author = response.data.username;

      //GET userId by name
      const user_ID_response =  await axios.get(`http://localhost:3000/user/${author}`, { withCredentials: true });
      const user_ID =  user_ID_response.data;

      
      axios.get(`http://localhost:3000/playlist/author/${user_ID}`)
        .then(response => {
          this.playlists = response.data;
        })
        .catch(error => {
          console.error('Error fetching playlists:', error);
        });
    }
  }
};
</script>

<style scoped>

</style>
