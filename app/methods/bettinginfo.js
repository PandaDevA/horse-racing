const BettingInfo = require('../models/bettinginfo');
let { ObjectId } = require('mongodb');

const insertBettingInfo = async(data) => {
    if(!data){
        console.log(`Data is undefined in insertBettingInfo`);
        return false;
    }

    await BettingInfo.deleteMany({});
    
    return await BettingInfo.insertMany(data).then(function(){
        console.log("Betting data inserted")  // Success
        return true;
    }).catch(function(error){
        console.log(error)      // Failure
        return false;
    });
}


const getBettingInfo = async() => {
    try {
        result = await BettingInfo.find({});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while getBettingInfo: ${e.message}`);
        return { result: false, error: e.message};
    }
}

module.exports = {
    insertBettingInfo,
    getBettingInfo,
};