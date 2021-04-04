const Resource = require('../../../methods/resource')
const CurRaceInfo = require('../../../methods/curraceinfo')

function settingController(){
    return {
        async index(req, res){
            const races = await CurRaceInfo.getCurRaceInfo();
            if(!races.result)
                res.render('admin/setting', {race_info: [], error: races.error});
            
            const result = await Resource.getResource();

            if(result.result) {
                res.render('admin/setting', {race_info: races.result, race_time: result.result.race_time, race_name: result.result.race_name});
            } else {
                res.render('admin/setting', {race_info: races.result, race_time: undefined, race_name: '', error: result.error});
            }
        },
     }
}

module.exports = settingController;