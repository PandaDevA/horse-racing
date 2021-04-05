const Resource = require('../../methods/resource')
const CurRaceInfo = require('../../methods/curraceinfo')
const NextRaceInfo = require('../../methods/nextraceinfo')
const BettingInfo = require('../../methods/bettinginfo')

function homeController(){
    return {
       async index(req, res) {
            let resData = {};
            //current race table data: [{name: '', sp: '', color: ''},{...}]
            const curraces = await CurRaceInfo.getCurRaceInfo();
            if(curraces.result) resData[curRaceData] = curraces.result;

            //next race table data: [{name: '', sp: '', color: ''},{...}]
            const nextraces = await NextRaceInfo.getNextRaceInfo();
            if(nextraces.result) resData[nextRaceData] = nextraces.result;
            
            /*resource data: 
                {
                    stream_url: '',         -
                    cur_race_time: '',       \
                    cur_race_name: '',        ?  These are used in home
                    next_race_time: '',       |
                    next_race_name: '',      /
                    feed_category: '',      -
                    pdf_url: '',
                    card_title: '',
                    tip_source: ''
                }*/
            const result = await Resource.getResource();
            if(result.result) resData[resource] = result.result;

            const bettinginfo = await BettingInfo.getBettingInfo();
            if(bettinginfo.result) resData[bettinginfo] = bettinginfo.result;

            res.render('home', resData);
        }
    }
}
module.exports = homeController;