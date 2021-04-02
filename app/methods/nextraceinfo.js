const Resource = require('../models/resource');

const editResource = async(data) => {
    if(!data) {
        console.log(`Data is undefined in editResource`);
        return;
    }

    try {
        result = await Resource.replaceOne({}, {stream_url: data.stream_url}, {upsert : true});
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