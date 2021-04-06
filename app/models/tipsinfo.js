const mongoose = require('mongoose');

const tipsSchema = new mongoose.Schema({
    selection: {type: String, default: ''},
    race: {type: String, default: ''},
    price: {type: String, default: ''},
    note: {type: String, default: ''},
});

module.exports = mongoose.model('TipsInfo', tipsSchema)