const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome!')
});

mongoose.connect('mongodb://localhost:27017/boutique')
mongoose.connection.once('open', () => {
    console.log('mongod...')
});

app.listen(3000, () => {
    console.log('listening...')
});