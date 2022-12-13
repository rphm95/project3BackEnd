const bcrypt = require('bcrypt');
const { response } = require('express');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
    User.find({}, (error, foundUser) => {
        res.json(foundUser)
    })
});

sessions.post('/userLogin', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        console.log(foundUser)
        if(err) {
            console.log(err)
            console.log('oops the db had a problem')
        } else if(!foundUser) {
            console.log('<a href="/">Sorry, no user found </a>')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
            } else {
                console.log('<a href="/"> password does not match </a>')
            }
        }
    })
});

sessions.delete('/', (req, res) => {
    req.session.destroy((user) => {
        res.json(user)
    })
});

module.exports = sessions;