const mongoose = require('mongoose');

const nextraceSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    sp: {type: String, default: ''},
    color: {type: String, default: ''},
});

module.exports = mongoose.model('NextRaceInfo', nextraceSchema)