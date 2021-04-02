const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    stream_url: {type: String, default: 'https://rudo.video/live/sportinghd'},
    pdf_url: {type: String, default: '/file/card.pdf'},
    cur_race_time: {type: String, default: '4:00'},
    cur_race_name: {type: String, default: 'Valparaiso - Race 1'},
    next_race_time: {type: String, default: '4:28'},
    next_race_name: {type: String, default: 'Valparaiso - Race 2 LIVE'},
    card_title: {type: String, default: 'Valparaiso race card - Thursday 25th March 2021'},
    tip_source: {type: String, default: 'Concepcion 25th March 2021'},
});

module.exports = mongoose.model('Resource', resourceSchema)