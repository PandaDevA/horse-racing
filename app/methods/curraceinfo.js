const CurRaceInfo = require('../models/curraceinfo');
const mongoose = require('mongoose');

const editCurRaceInfo = async(data) => {
    if(!data) {
        console.log(`Data is undefined in editCurRaceInfo`);
        return;
    }

    let id;
    try {
        id = mongoose.Types.ObjectId(data.id);
    } catch (e) {
        console.log(`${id} is not valid ID while editCurRaceInfo`);
        return {result: false, error: 'id is not valid'};
    }

    if(!await CurRaceInfo.exists({_id: id}))
        try {
            const info = new CurRaceInfo({ name: data.name, sp: data.sp });
            let returnInfo = await info.save();
            if(returnInfo) {
                return { result: returnInfo, error: '' };
            } else {
                return { result: returnInfo, error: 'Error CurRaceInfo could not save'};
            }
        } catch (e) {
            console.log(`Error while editCurRaceInfo: ${e.message}`);
            return { result: false, error: e.message};
        }

    try {
        result = await CurRaceInfo.updateOne({_id: id}, {name: data.name, sp: data.sp}, {upsert : true});
        return { result: result, error: '' }
    } catch(e) {
        console.log(`Error while editCurRaceInfo: ${e.message}`);
        return { result: false, error: e.message};
    }
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