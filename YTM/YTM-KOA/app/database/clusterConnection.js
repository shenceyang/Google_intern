const mongoose = require('mongoose');
const username = 'test';
const password = 'test123';
const clusterURL = `mongodb+srv://${username}:${password}@atlascluster.1k4mtwp.mongodb.net`; 

//cluster connection
const connectCluster = () => {
    mongoose.connect(clusterURL)
    .then(() => {
        console.log('connected to cluster');
       }
    ).catch((err) => {
        console.log(err)
    })
}



module.exports = connectCluster;