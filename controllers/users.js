const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (req, res) => {
    User.find({}, (error, foundUser) => {
        res.send(req.session.currentUser)
    })
});

users.post('/new', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        res.send(req.session.currentUser)
    })
});

// users.get('/UserList', (req, res) => {
//     User.find({}, {username: 1}, (error, UserList) => {
//         res.send(UserList)
//     })
// });

module.exports = users;