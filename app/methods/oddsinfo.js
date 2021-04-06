const OddsInfo = require('../models/oddsinfo');

const editOddsInfo = async(data) => {
    if(!data || data.length == 0) {
        console.log(`Data is undefined in editOddsInfo`);
        return false;
    }

    await OddsInfo.deleteMany({});
    
    return await OddsInfo.insertMany(data).then(function(){
        console.log("Odd data inserted")  // Success
        return true;
    }).catch(function(error){
        console.log(error)      // Failure
        return false;
    });
}

const getOddsInfo = async() => {
    try {
        result = await OddsInfo.find({});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while getOddsInfo: ${e.message}`);
        return { result: false, error: e.message};
    }
}

module.exports = {
    editOddsInfo,
    getOddsInfo,
};