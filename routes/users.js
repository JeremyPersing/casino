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
    } catch (err) {
        res.json({message: err});
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

router.put('/', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({userName: req.body.userName}, {$set: {coins: req.body.coins}});
        res.json(updatedUser);
    } 
    catch (err) {
        res.json()
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