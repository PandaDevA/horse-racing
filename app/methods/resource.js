const Resource = require('../models/resource');

const editResource = async(data) => {
    if(!data) {
        console.log(`Data is undefined in editResource`);
        return;
    }

    try {
        const doc = {};
        if(data.stream_url) doc.stream_url = data.stream_url;
        if(data.pdf_url) doc.pdf_url = data.pdf_url;
        if(data.cur_race_time) doc.cur_race_time = data.cur_race_time;
        if(data.cur_race_name) doc.cur_race_name = data.cur_race_name;
        if(data.next_race_time) doc.next_race_time = data.next_race_time;
        if(data.next_race_name) doc.next_race_name = data.next_race_name;
        if(data.card_title) doc.card_title = data.card_title;
        if(data.tip_source) doc.tip_source = data.tip_source;

        result = await Resource.updateOne({}, doc, {upsert : true});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while editResource: ${e.message}`);
        return { result: false, error: e.message};
    }
}

const getResource = async() => {
    try {
        result = await Resource.findOne({});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while getResource: ${e.message}`);
        return { result: false, error: e.message};
    }
}

module.exports = {
    editResource,
    getResource,
};