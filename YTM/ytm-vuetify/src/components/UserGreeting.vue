<template>
    <div>
      <h1 v-if="username">Welcome, {{ username }}</h1>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: ''
      };
    },
    async created() {
      await this.fetchUser();
    },
    methods: {
      async fetchUser() {
        try {
          const response = await axios.get('http://localhost:3000/getuser', { withCredentials: true });
          this.username = response.data.username;
        } catch (error) {
          console.error('There was an error fetching the user data:', error);
        }
      }
    }
  };
  </script>
  