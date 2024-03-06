
const mongoose = require('mongoose');

//connect to the cluster
const username = 'test';
const password = 'test123';
const clusterURL = `mongodb+srv://${username}:${password}@atlascluster.1k4mtwp.mongodb.net`; 
mongoose.connect(clusterURL)
.then(() => {
    console.log('connected to cluster');
   }
).catch((err) => {
    console.log(err)
})

