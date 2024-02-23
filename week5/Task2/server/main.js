const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('koa-router');
const router = new Router();
const User = require("../server/models/user")
const username = 'test';
const password = 'test123';
const clusterURL = `mongodb+srv://${username}:${password}@atlascluster.1k4mtwp.mongodb.net`;



//middleware
app.use(bodyParser());
app.use(cors());
app.use(router.routes());


//connect to cluster  

mongoose.connect(clusterURL)
.then(() => {
    console.log('connected to cluster');
   }
).catch((err) => {
    console.log(err)
})



                                      //User



router.post('/signup', async (ctx) => {
    console.log(ctx.request.body)

    try{
        console.log('create user');
        const newuser = new User(ctx.request.body);

        //check if username already exists
        const username = await User.findOne({name: newuser.name});
        if(username){
            ctx.status = 400;
            ctx.body = {
                status: '1',
                message: 'Username already exists'
            }
            return ctx;
        }
        else{
            await newuser.save();
            ctx.status = 200;
            ctx.body = {
                status: '0',
                msg:"success",
            }

            return ctx;
        }

    }catch(err){
        console.log(err);
    }
});

router.post('/login', async (ctx) => {
    console.log('ctx body is ');
    console.log(ctx.request.body)

    try{
        console.log('login user');
        const user = new User(ctx.request.body);
        const username = await User.findOne({name: user.name});
        if(username){
            ctx.status = 200;
            ctx.body = {
                status: '0',
                msg:"success",
            }
            return ctx;
        }
        else{
            ctx.status = 400;
            ctx.body = {
                status: '1',
                message: 'Username or password is incorrect'
            }
            return ctx;
        }
    }catch(err){
        console.log(err);
    }
});









app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');});
