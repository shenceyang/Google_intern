<template>
    <div>
      <h1>Now Playing: Track ID - {{ trackId }}</h1>
      <!-- Your audio player component will go here -->
    </div>
</template>
  
<script>
  export default {
    props: {
      trackId: String,
    },
  };
</script>
  