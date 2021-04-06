const Resource = require('../../../methods/resource')
const CurRaceInfo = require('../../../methods/curraceinfo')
const NextRaceInfo = require('../../../methods/nextraceinfo')
const UserInfo = require('../../../methods/users')
const BettingInfo = require('../../../methods/bettinginfo')
const OddsInfo = require('../../../methods/oddsinfo')
const TipsInfo = require('../../../methods/tipsinfo')

function settingController(){
    return {
        async index(req, res){
            let resData = {};

            //user table data: 
            const users = await UserInfo.getUserList();
            if(users.result) resData['users'] = users.result;
            
            //current race table data: [{name: '', sp: '', color: ''},{...}]
            const curraces = await CurRaceInfo.getCurRaceInfo();
            if(curraces.result) resData['curRaceData'] = curraces.result;

            //next race table data: [{name: '', sp: '', color: ''},{...}]
            const nextraces = await NextRaceInfo.getNextRaceInfo();
            if(nextraces.result) resData['nextRaceData'] = nextraces.result;
            
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
            
            const bettinginfo = await BettingInfo.getBettingInfo();
            if(bettinginfo.result) resData['bettinginfo'] = bettinginfo.result;
            const tipsinfo = await TipsInfo.getTipsInfo();
            if(tipsinfo.result) resData['tipsinfo'] = tipsinfo.result;
            const oddsinfo = await OddsInfo.getOddsInfo();
            if(oddsinfo.result) resData['oddsinfo'] = oddsinfo.result;

            res.render('admin/setting', resData);
        },

        async upload(req, res) {
            try {
                if(!req.files) {
                    req.flash('upload', {
                        status: false,
                        message: 'No file uploaded'
                    });
                } else {
                    //Use the name of the input field (i.e. "file") to retrieve the uploaded file
                    let file = req.files.file;
                    
                    //Use the mv() method to place the file in upload directory (i.e. "uploads")
                    file.mv('./uploads/' + file.name);
        
                    //flash response
                    req.flash('upload', {
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: file.name,
                            mimetype: file.mimetype,
                            size: file.size
                        }
                    });
                }
            } catch (err) {
                req.flash('upload', {status: false, message: err});
            }
        }
    }
}

module.exports = settingController;