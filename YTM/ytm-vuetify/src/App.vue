<template>
          <router-view></router-view>
 
</template>

<script>

export default {
  name: 'App',
  components: {
  
  }
}
</script>

<style>
/* src/assets/global.css */

html, body, #app {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  
  /* If you need to reset padding for Vuetify's containers */
  .container, .container--fluid {
    padding: 0 !important;
    margin: 0 !important;
  }
  


</style>
