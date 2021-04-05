const mongoose = require('mongoose');

const bettingSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    time: {type: String, default: ''},
    text: {type: String, default: ''},
}, {timestamps: true});

module.exports = mongoose.model('BettingInfo', bettingSchema)