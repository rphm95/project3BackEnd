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

mongoose.connect('mongodb+srv://laboutique2:XGbGa0dShMo4ydPq@boutique.h7t4mgj.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})