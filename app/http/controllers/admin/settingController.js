const Resource = require('../../../methods/resource')
const CurRaceInfo = require('../../../methods/curraceinfo')
const NextRaceInfo = require('../../../methods/nextraceinfo')
const UserInfo = require('../../../methods/users')
const BettingInfo = require('../../../methods/bettinginfo')
const OddsInfo = require('../../../methods/oddsinfo')
const TipsInfo = require('../../../methods/tipsinfo')
const fs = require('fs');

function settingController(){
    return {
        async index(req, res){
            let resData = {};

            //user table data: 
            const users = await UserInfo.getUserList(null, 1, 10);
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

            const directory = __dirname + '/uploads/odd/';
            try {
                fs.readdir(directory, (err, files) => {
                    if(err) console.error(`Error occured while list Excel files ${err}`);
                    else {
                        resData['excelList'] = files;
                        console.log('List of excel files :');
                        console.log(files);
                    }
                });
            } catch (err) {
                console.error(`Error occured while list Excel files ${err}`);
            }

            res.render('admin/setting', resData);
        },

        async user(req, res){
            let { filter, page, count } = req.body;
            let resData = {};

            //user table data: 
            const users = await UserInfo.getUserList(filter, page, count);
            if(users.result) resData = users.result;

            res.render('admin/setting/user', resData);
        },

        async upload(req, res) {
            try {
                if(!req.files) {
                    console.log('Error: Pdf file must be supplied while uploading.')
                    res.status(403).send ({message: 'Error: Select the upload file.'});
                } else {
                    //Use the name of the input field (i.e. "file") to retrieve the uploaded file
                    let file = req.files.file;
                    
                    //Use the mv() method to place the file in upload directory (i.e. "uploads")
                    file.mv('./uploads/card/' + 'card.pdf');
        
                    //flash response
                    console.log('Upload pdf success.');
                    res.status(200).send({result: true});
                }
            } catch (err) {
                console.log('Error occured while upload :', err);
                res.status(500).end({message: err});
            }
        },

        async oddUpload(req, res) {
            try {
                if(!req.files) {
                    console.log('Error: Excel file must be supplied while uploading.')
                    res.status(403).send ({message: 'Error: Select the upload file.'});
                } else {
                    //Use the name of the input field (i.e. "file") to retrieve the uploaded file
                    let file = req.files.file;
                    
                    //Use the mv() method to place the file in upload directory (i.e. "uploads")
                    file.mv('./uploads/odd/' + file);
        
                    //flash response
                    console.log('Upload excel success.');
                    res.status(200).send({result: true});
                }
            } catch (err) {
                console.log('Error occured while upload :', err);
                res.status(500).end({message: err});
            }
        }

    }
}

module.exports = settingController;