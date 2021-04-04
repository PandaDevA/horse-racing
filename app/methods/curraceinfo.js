const CurRaceInfo = require('../models/curraceinfo');

const editCurRaceInfo = async(data) => {
    if(!data || data.length == 0) {
        console.log(`Data is undefined in editCurRaceInfo`);
        return false;
    }

    await CurRaceInfo.deleteMany({});
    
    await CurRaceInfo.insertMany(data).then(function(){
        console.log("Data inserted")  // Success
        return true;
    }).catch(function(error){
        console.log(error)      // Failure
        return false;
    });
}

const getCurRaceInfo = async() => {
    try {
        result = await CurRaceInfo.find({});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while getCurRaceInfo: ${e.message}`);
        return { result: false, error: e.message};
    }
}

module.exports = {
    editCurRaceInfo,
    getCurRaceInfo,
};