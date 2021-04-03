const Resource = require('../../../methods/resource')
const CurRaceInfo = require('../../../methods/curraceinfo')

function raceController(){
    return {
        index(req, res){
           CurRaceInfo.getCurRaceInfo().then((races)=>{
                if(races.result) {
                    console.log(races);
                    Resource.getResource().then((result)=>{
                        if(result.result) {
                            res.render('admin/setting', {race_info: races.result, race_time: result.result.race_time, race_name: result.result.race_name});
                        } else {
                            res.render('admin/setting', {race_info: races.result, race_time: undefined, race_name: '', error: result.error});
                        }
                    });
                } else {
                    res.render('admin/setting', {race_info: [], error: races.error})
                }
            })
        }
    }
}

module.exports = raceController;