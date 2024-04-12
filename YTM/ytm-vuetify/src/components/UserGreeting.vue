<template>
    <div>
      <h3 v-if="username">Welcome to YTM, {{ username }}</h3>
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
  
  <style scoped>
h3 {
  font-family: 'MedievalSharp', cursive;
  font-size: 2rem; 
  font-weight: 500; 
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>