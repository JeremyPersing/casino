const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('User', UserSchema)