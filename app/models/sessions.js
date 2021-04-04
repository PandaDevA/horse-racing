const mongoose = require('mongoose');

const sessionsSchema = new mongoose.Schema({
    expires: {type: Date, required: true},
    seesion: {type: String, required: true},
});

module.exports = mongoose.model('Sessions', sessionsSchema)