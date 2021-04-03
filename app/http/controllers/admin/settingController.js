const Resource = require('../../../methods/resource')
const CurRaceInfo = require('../../../methods/curraceinfo')
const moment = require('moment'); //time formater in javascript

function raceController(){
    return {
        index(req, res){
           CurRaceInfo.getCurRaceInfo().then((races)=>{
                if(races.result) {
                    console.log(races);
                    res.render('admin/setting', {race_info: races.result, moment: moment});
                } else {
                    res.render('admin/setting', {race_info: [], moment: moment, error: races.error})
                }
            })
        }
    }
}

module.exports = raceController;