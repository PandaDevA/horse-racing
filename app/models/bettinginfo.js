const mongoose = require('mongoose');

const bettingSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    time: {type: String, default: ''},
    text: {type: String, default: ''},
});

module.exports = mongoose.model('BettingInfo', bettingSchema)