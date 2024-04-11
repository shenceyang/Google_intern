<template>
    <div class="home-container">
      <h1 class="title">Welcome to YTM Music Platform</h1>
      <div class="button-group">
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <router-link to="/signup" class="btn btn-secondary">Sign Up</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage'
  };
  </script>
  
  <style scoped>
   * {
       margin: 0;
   }
   

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  margin: 0; /* Reset any default margin */
  padding: 0; /* Reset any default padding */
  background-image: url('../assets/home.jpg');
  background-size: cover;
  background-position: center bottom;
}

  
  .title {
    font-size: 4rem; 
    color: #555; 
    animation: flashingText 3s infinite;
    margin-bottom: 2rem;
  }
  
  @keyframes flashingText {
    0%, 100% { color: #ffffff; }
    50% { color: #00ff77; }
  }
  
  .button-group {
    display: flex;
    gap: 5rem; 
  }
  
  .btn {
    padding: 15px 50px; 
    font-size: 20px; 
    border-radius: 10px; 
    cursor: pointer;
    text-decoration: none; 
    display: inline-block; 
    transition: background-color 0.3s, transform 0.3s; 
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #0056b3; 
    transform: scale(1.05); 
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #545b62;
    transform: scale(1.05); 
  }
  
  /* Adjust the button sizes for mobile screens */
  @media (max-width: 768px) {
    .btn {
      padding: 12px 24px; 
      font-size: 18px;
    }
    
    .button-group {
      flex-direction: column;
      gap: 3rem;
    }
  }
  </style>
  