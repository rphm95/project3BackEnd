const bcrypt = require('bcrypt');
const { response } = require('express');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
        res.send(req.session.currentUser)
});

sessions.post('/userLogin', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        
        if(err) {
            console.log(err)
            req.session.currentUser = 'oops the db had a problem'
            res.send(req.session.currentUser)
        } else if(!foundUser) {
            req.session.currentUser = 'Sorry, no user found'
            res.send(req.session.currentUser)
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.send(req.session.currentUser)
            } else {
                req.session.currentUser = ' password does not match'
                res.send(req.session.currentUser)
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