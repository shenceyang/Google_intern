const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/login', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Login successful' });
});


app.post('/signup', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Signup successful' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
