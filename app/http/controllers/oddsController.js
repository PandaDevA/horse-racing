const OddsInfo = require('../../methods/oddsinfo')
const Resource = require('../../methods/resource')

function oddsController(){
    return {
       async index(req, res) {
        if(req.user && req.user.role != 'admin' && req.user.access.indexOf('odds') == -1)res.redirect('/home');
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
                    tip_source: ''
                }*/
            const result = await Resource.getResource();
            if(result.result) resData['resource'] = result.result;
            
            const oddsinfo = await OddsInfo.getOddsInfo();
            if(oddsinfo.result) resData['oddsinfo'] = oddsinfo.result;

            res.render('odds', resData);
        }
    }
}
module.exports = oddsController;