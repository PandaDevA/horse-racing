const NextRaceInfo = require('../models/nextraceinfo');

const editNextRaceInfo = async(data) => {
    if(!data || data.length == 0) {
        console.log(`Data is undefined in editNextRaceInfo`);
        return false;
    }

    await NextRaceInfo.deleteMany({});
    
    await NextRaceInfo.insertMany(data).then(function(){
        console.log("Data inserted")  // Success
        return true;
    }).catch(function(error){
        console.log(error)      // Failure
        return false;
    });
}

const getNextRaceInfo = async() => {
    try {
        result = await NextRaceInfo.find({});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while getNextRaceInfo: ${e.message}`);
        return { result: false, error: e.message};
    }
}

module.exports = {
    editNextRaceInfo,
    getNextRaceInfo,
};