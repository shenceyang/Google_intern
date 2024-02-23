
function update(){
   //signup successful change UI
   const container = document.querySelector('.container');
   container.innerHTML = `
   <div class="Homepage">
      <h1>Home page</h1>
   </div>`;
}

window.onload = function() {

    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const form = document.querySelector('form');
  
    
    loginBtn.addEventListener('click', function(event) {
        console.log('login');
        event.preventDefault(); // Prevent the form from submitting the default way
        const formData = new FormData(form);
        const userData = {
            name: formData.get('username'),
            password: formData.get('password'),
        };
    
      
      axios.post('http://localhost:3000/login', userData)
      .then(response => {
          console.log('Login Success:', response);
          update('Welcome Back!');
      })
      .catch(error => {
          console.error('Login Error:', error);
          alert('Login failed: ' + (error.response?.data.message || error.message));
      });
        
        //clear input after submit
        const usernameInput = document.querySelector('input[name="username"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const rememberMeCheckbox = document.getElementById('rememberMe');
        usernameInput.value = '';
        passwordInput.value = '';
        rememberMeCheckbox.checked = false;

        //update();

    });


  
    signupBtn.addEventListener('click', function(event) {
      event.preventDefault();
      const formData = new FormData(form);
      const userData = {
          name: formData.get('username'),
          password: formData.get('password'),
      };
  
      // You don't need to set the header explicitly if you're passing an object to Axios
      axios.post('http://localhost:3000/signup', userData)
      .then(response => {
          console.log('Signup Success:', response);
          update('Signup Successful. Please log in.');
      })
      .catch(error => {
          console.error('Signup Error:', error);
          alert('Signup failed: ' + (error.response?.data.message || error.message));
      });
  });
  

        //update();
       
        

    


  };

  