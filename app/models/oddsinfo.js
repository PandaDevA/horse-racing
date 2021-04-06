const mongoose = require('mongoose');

const oddsSchema = new mongoose.Schema({
    date: {type: String, default: ''},
    meeting: {type: String, default: ''},
    overnight: {type: String, default: ''},
    morning: {type: String, default: ''},
});

module.exports = mongoose.model('OddsInfo', oddsSchema)