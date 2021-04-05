const Resource = require('../../methods/resource')

function oddsController(){
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
                    tip_source: ''
                }*/
            const result = await Resource.getResource();
            if(result.result) resData[resource] = result.result;

            res.render('odds', resData);
        }
    }
}
module.exports = oddsController;