const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        password: req.body.password,
        coins: req.body.coins
    })

    try {
        const givenUser = await user.save()
        res.json(givenUser);
    } catch (e) {
        res.json({message: e});
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } 
    catch (err) {
        res.json({message: err})
    }
})

router.delete('/', async (req, res) => {
    try {
        await User.remove();
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router;