const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(
    {
        origin:'https://powerful-sierra-23754.herokuapp.com',
        credentials:true
    }
));
app.set('trust proxy',1)
app.use(session({
    secret: 'seymour',
    resave: false,
    saveUninitialized: false,
    cookie:{sameSite:'none',secure:true}
}))
// app.use(express.urlencoded({extended:true}));
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const Clothes = require('./models/clothes.js');
const seedClothes = require('./models/seedClothes.js');

let PORT = 3000
if(process.env.PORT){
    PORT = process.env.PORT
}

const accessoriesController = require('./controllers/accessories.js');
app.use(accessoriesController)


// ======= SEED ROUTES =============
app.get('/boutique/seed', (req, res) => {
    Clothes.create(seedClothes, (err, data) => {
        res.send(data)
    })
})
// ============= other routes clothes =============


// create
app.post('/boutique', (req, res) => {
    Clothes.create(req.body, (err, createClothes) => {
        res.json(createClothes)
    })
})

// get
app.get('/boutique', (req, res) => {
    Clothes.find({}, (err, foundClothes) => {
        res.json(foundClothes)
    })
})

// delete
app.delete('/boutique/:id', (req, res) => {
    Clothes.findByIdAndRemove(req.params.id, (err, deleteClothes) => {
        res.json(deleteClothes)
    })
})

// update
app.put('/boutique/:id', (req, res) => {
    Clothes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateClothes) => {
        res.json(updateClothes)
    })
})




// ======= CONNECTIONS ============

app.listen(PORT, (req, res) => {
    console.log('listening on port 3000')
})

mongoose.connect('mongodb+srv://laboutique2:XGbGa0dShMo4ydPq@boutique.h7t4mgj.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})