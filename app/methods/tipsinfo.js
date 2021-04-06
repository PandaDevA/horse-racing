const TipsInfo = require('../models/tipsinfo');

const editTipsInfo = async(data) => {
    if(!data || data.length == 0) {
        console.log(`Data is undefined in editTipsInfo`);
        return false;
    }

    await TipsInfo.deleteMany({});
    
    return await TipsInfo.insertMany(data).then(function(){
        console.log("Tip data inserted")  // Success
        return true;
    }).catch(function(error){
        console.log(error)      // Failure
        return false;
    });
}

const getTipsInfo = async() => {
    try {
        result = await TipsInfo.find({});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while getTipsInfo: ${e.message}`);
        return { result: false, error: e.message};
    }
}

module.exports = {
    editTipsInfo,
    getTipsInfo,
};