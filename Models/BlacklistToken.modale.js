const mongoose = require('mongoose')

const blacklistToken = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hours in second
        
    }
})

module.exports = mongoose.model('BlacklistToken', blacklistToken)