<template>
    <div class="row">
            <div class = "container">
              

                <form>
                    <div>
                        <h3> Sign up </h3>
                        <hr />
                    </div>
                    
                    
                   <div class="form-group">
                        <label> Username</label>
                        <input type = "text" class="form-control" placeholder="Username" id="username" />
                   </div>

                    <div class="form-group">
                        <label> Password</label>
                        <input type = "password" class="form-control" placeholder="Password" id="password" />
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="remember">
                            remember me
                        </label>
                    </div>
                    
                    <div class="my-3">
                        <button onclick="submit()" type = "submit" class="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>

   
    </div>
</template>

<style >
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
export default{};
</script>