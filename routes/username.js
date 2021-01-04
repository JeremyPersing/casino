const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let user = await User.find({
            userName: req.body.userName
        })
        res.send(user)
    } 
    catch (err) {
        res.json({message: err})
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } 
    catch (err) {
        res.json({message: err})
    }
})

module.exports = router;