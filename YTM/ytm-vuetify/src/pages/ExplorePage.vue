<template>
    <div>
      <h1>Dashboard</h1>
      <p v-if="username">Welcome, {{ username }}</p>
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
    created() {
      this.fetchUser();
    },
    methods: {
      async fetchUser() {
        try {
          // set cookie from client side to server side to pass jwtauth
          const response = await axios.get('http://localhost:3000/getuser', { withCredentials: true });
          this.username = response.data.username;
        } catch (error) {
          console.error('There was an error fetching the user data:', error);
        }
      }
    }
  };
  </script>
  