

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
      event.preventDefault(); // Prevent the form from submitting the default way
      const formData = new FormData(form);
      const userData = {
        user: formData.get('username'),
        secret: formData.get('password'),
        remember: formData.get('remember') === 'on'
      };
      console.log('Login Data:', userData);

      
      axios.post('http://127.0.0.1:3000/login', userData)
        .then(response => {
          console.log('Login Success:', response);
          // Handle login success, e.g., redirecting to another page
        })
        .catch(error => {
          console.error('Login Error:', error);
          // Handle error
        });
        

        //clear input after submit
        const usernameInput = document.querySelector('input[name="username"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const rememberMeCheckbox = document.getElementById('rememberMe');
        usernameInput.value = '';
        passwordInput.value = '';
        rememberMeCheckbox.checked = false;

        update();

    });


  
    signupBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the form from submitting the default way
      const formData = new FormData(form);
      const userData = {
        user: formData.get('username'),
        secret: formData.get('password'),
      };
  
      axios.post('http://127.0.0.1:3000/signup', userData)
        .then(response => {
          console.log('Signup Success:', response);
          // Handle signup success
        })
        .catch(error => {
          console.error('Signup Error:', error);
          // Handle error
        });

        update();
       
        

    });


  };

  