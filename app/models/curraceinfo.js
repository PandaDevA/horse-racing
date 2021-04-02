const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    sp: {type: String, default: ''},
});

module.exports = mongoose.model('CurRaceInfo', resourceSchema)