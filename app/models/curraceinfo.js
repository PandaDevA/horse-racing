const mongoose = require('mongoose');

const curraceSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    sp: {type: String, default: ''},
    color: {type: String, default: ''},
});

module.exports = mongoose.model('CurRaceInfo', curraceSchema)