const Resource = require('../../methods/resource')
const TipsInfo = require('../../methods/tipsinfo')

function tipsController(){
    return {
       async index(req, res) {
            let resData = {};
            
            /*resource data: 
                {
                    stream_url: '',
                    pdf_url: '',
                    cur_race_time: '',
                    cur_race_name: '',
                    next_race_time: '',
                    next_race_name: '',
                    card_title: '',
                    tip_source: ''      This is only used in here
                }*/
            const result = await Resource.getResource();
            if(result.result) resData[resource] = result.result;
            const tipsinfo = await TipsInfo.getTipsInfo();
            if(tipsinfo.result) resData['tipsinfo'] = tipsinfo.result;

            res.render('tips', resData);
        }
    }
}
module.exports = tipsController;