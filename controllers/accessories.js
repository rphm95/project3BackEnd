const express = require('express');
const router = express.Router();

const Accessories = require('../models/accessories.js')

// ====================================================

// create
router.post('/accessories', (req, res) => {
    Accessories.create(req.body, (err, createdAccessories) => {
        res.json(createdAccessories)
    })
})

// get
router.get('/accessories', (req, res) => {
    Accessories.find({}, (err, foundAccessories) => {
        res.json(foundAccessories)
    })
})

// delete
router.delete('/accessories/:id', (req, res) => {
    Accessories.findByIdAndRemove(req.params.id, (err, deleteAccessories) => {
        res.json(deleteAccessories)
    })
});

// update 
router.put('/accessories/:id', (req, res) => {
    Accessories.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateAccessories) => {
        res.json(updateAccessories)
    });
})


module.exports = router;