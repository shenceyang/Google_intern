<template>
    <header class="navbar">
      <div class="navbar__title">
     <user-greeting></user-greeting>
      </div>


      <nav class="navbar__nav">
        <router-link to="/explore" class="navbar__link">Explore</router-link>
        <router-link to="/library" class="navbar__link">Library</router-link>
        <router-link to="/" class="navbar__link" exact>Log out</router-link>
      </nav>
    </header>
  </template>
  
  <script>
import UserGreeting from '../components/UserGreeting.vue'; 

  export default {
    name: 'NavBar',
    components: {
      UserGreeting,
    },
  };
  </script>
  <style scoped>
  .navbar {
    display: flex;
    align-items: center;
    background-color: #696969;
    color: white;
    padding-top: 1.5rem; /* Increase top padding */
    padding-bottom: 1.5rem; /* Increase bottom padding */
    padding-left: 1rem; /* Maintain left padding */
    padding-right: 1rem; /* Maintain right padding */
  }
  
  .navbar__title {
    font-size: 1.5rem;
    flex-grow: 1;
  }
  
  .navbar__nav {
    display: flex;
  }
  
  .navbar__link {
    text-decoration: none;
    color: white;
    margin-right: 1rem;
    padding: 0.5rem 1rem; /* Adjust if necessary for alignment */
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .navbar__link:hover, .navbar__link.router-link-exact-active {
    background-color: #4d4d4f;
  }
  </style>
  