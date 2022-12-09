const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

let PORT = 3000
if(process.env.PORT){
    PORT = process.env.PORT
}



// ======= CONNECTIONS ============

app.listen(PORT, (req, res) => {
    console.log('listening on port 3000')
})

mongoose.connect('mongodb+srv://rphm95:R160589867@sei.7r3v4df.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})