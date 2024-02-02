const axios = require('axios');

const apiKey = '76e6e2c63b078f26fc41972be4ccada5';
const artistName = 'Justin Bieber';
const trackTitle = 'Baby';

const url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${trackTitle}&q_artist=${artistName}`;


axios.get(url, {
    headers: {
        'Authorization': `Bearer ${apiKey}`
    }
})
.then(response => {
    // Process the response data here
    console.log(response.data);
})
.catch(error => {
    console.error('Error fetching data: ', error);
});