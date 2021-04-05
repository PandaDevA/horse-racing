const Resource = require('../../methods/resource')

function cardsController(){
    return {
       async index(req, res) {
            let resData = {};
            
            /*resource data: 
                {
                    stream_url: '',
                    cur_race_time: '',
                    cur_race_name: '',
                    next_race_time: '',
                    next_race_name: '',
                    pdf_url: '',        -. 
                    card_title: '',     _/  These are used in here
                    tip_source: ''
                }*/
            const result = await Resource.getResource();
            if(result.result) resData[resource] = result.result;

            res.render('cards', resData);
        }
    }
}
module.exports = cardsController;