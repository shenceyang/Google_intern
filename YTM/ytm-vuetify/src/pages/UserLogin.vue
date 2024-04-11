<template>
    <div class="row">
            <div class = "container">

                <form @submit.prevent="loginSubmit">
                    <div>
                        <h3> Login </h3>
                        <hr />
                    </div>
                    
                    
                   <div class="form-group">
                        <label> Username</label>
                        <input type = "text" class="form-control" v-model="user_name" placeholder="Username"  id="username" />
                   </div>

                    <div class="form-group">
                        <label> Password</label>
                        <input type = "password" class="form-control" v-model="password" placeholder="Password" id="password" />
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="remember" v-model="remember_me">
                            remember me
                        </label>
                    </div>
                    
                    <div class="my-3">
                        <button type = "submit" class="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>

   
    </div>
</template>

<style scoped >
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    background-image: url('../assets/login_signupBG.jpg');
    background-size: cover;
    background-position: center;

}

form {
    width: 100%;
    height: 600px;
    max-width: 600px; 
    margin: auto; 
    background-color: #fff;
    padding: 40px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}


.form-control {
    width: calc(100% - 20px); 
    margin-bottom: 15px; 
}

button {
    width: 100%;
}

</style>

<script>
import axios from 'axios';


export default{

    methods:{
        
        loginSubmit(){
         
            const data = {
                username: this.user_name,
                password: this.password,
                remember: this.remember_me || false
            }

            //need to add {withCredentials: true} to send cookies
            axios.post('http://localhost:3000/login', data,{ withCredentials: true })
            .then(response => {
                
                if (response.data && response.data.status === 0) {
                    // Login successful, redirect to explore page
                    this.$router.push('/explore');
                } else {
                    // Handle login failure (you might want to show an error message to the user)
                    console.error(response.data.msg || 'Login failed');
                    alert('Login failed');
                }

            })
            .catch(error => {
                console.log(error);
            });
            
        }

    }

};

</script>