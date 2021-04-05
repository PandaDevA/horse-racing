const BettingInfo = require('../models/bettinginfo');
let { ObjectId } = require('mongodb');

const insertBettingInfo = async(data) => {
    if(!data){
        console.log(`Data is undefined in insertBettingInfo`);
        return false;
    }
    
    const bettingData = new BettingInfo(data);
    return await bettingData.save().then(function(){
        console.log("Betting data inserted")  // Success
        return true;
    }).catch(function(error){
        console.log(error)      // Failure
        return false;
    });
}

const updateBettingInfo = async(data) => {
    if(!data || !data.id){
        console.log(`Data is undefined in updateBettingInfo`);
        return false;
    }
    
    let parsedId;
    try {
        parsedId = ObjectId(data.id);
    } catch (error) {
        console.log(`Syntax Error: id is not valid while timeoutuser`);
        return false;
    }

    let updateData = {};
    if(data.time) updateData.time = data.time;
    if(data.name) updateData.name = data.name;
    if(data.text) updateData.text = data.text;
    console.log(updateData);
    return await BettingInfo.updateOne({_id: parsedId}, updateData).then(function(){
        console.log("Betting data updateed")  // Success
        return true;
    }).catch(function(error){
        console.log(error)      // Failure
        return false;
    });
}

const clearBettingInfo = async() => {
    return await BettingInfo.deleteMany({});
}

const getBettingInfo = async() => {
    try {
        result = await BettingInfo.find({}).sort({createdAt: -1});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while getBettingInfo: ${e.message}`);
        return { result: false, error: e.message};
    }
}

module.exports = {
    updateBettingInfo,
    clearBettingInfo,
    insertBettingInfo,
    getBettingInfo,
};