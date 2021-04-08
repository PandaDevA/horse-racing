const CurRaceInfo = require('./methods/curraceinfo');
const NextRaceInfo = require('./methods/nextraceinfo');
const Resource = require('./methods/resource');
const BettingInfo = require('./methods/bettinginfo');
const TipsInfo = require('./methods/tipsinfo');
const OddsInfo = require('./methods/oddsinfo');
const Sessions = require('./models/sessions');

// const leaveFromAll = (socket) => {
//     socket.leave('stream_url');
//     socket.leave('card_title');
//     socket.leave('cur_race');
//     socket.leave('next_race');
//     // socket.leave('');
// }

const exportedMethods = {
    
    async useSocket(io) {
        await Sessions.deleteMany({});

        io.on('connection', socket => {
            console.log('a user connected');
            
            socket.on('disconnect', () => {
                console.log('user disconnected');
                // leaveFromAll(socket);
            });

            socket.on('join', (data) => {
                console.log('join request received');

                //join Urls are in data.joinTo as Array like this: data = {joinTo: ['stream_url', 'card_title' ...]}
                //same as urls which in leaveFromAll func
                console.log(data.joinTo);
                // leaveFromAll(socket);
                if(data.joinTo) {
                    data.joinTo.map((url, index) => {
                        socket.join(url);
                    });
                }
            });

            socket.on('cur_race_save', async (data) => {
                console.log('cur_race_save request is received');
                if(!data) {
                    //Error data is undefined
                    socket.emit('cur_race_save', {result: false, error: 'The info of current race must be supplied'});
                    return;
                }
                if(!data.time || data.time ==='') {
                    //Error data.time is not supplied
                    socket.emit('cur_race_save', {result: false, error: 'Time of current race is not supplied'});
                    return;
                }
                if(!data.name || data.name ==='') {
                    //Error data.name is not supplied
                    socket.emit('cur_race_save', {result: false, error: 'Name of current race is not supplied'});
                    return;
                }
                if(!data.tabledata || data.tabledata.length == 0) {
                    //Error data.tabledata is not supplied
                    socket.emit('cur_race_save', {result: false, error: 'Runner info is not supplied'});
                    return;
                }

                //save to curraceinfo model
                let result = await Resource.editResource({cur_race_time: data.time, cur_race_name: data.name});
                if(!result.result) {
                    //Emit error message
                    socket.emit('cur_race_save', {result: false, error: 'Error occurred while save current race info'});
                    return;
                }

                //Format of data.tabledata is [{name: '...', sp: '...'}]
                result = await CurRaceInfo.editCurRaceInfo(data.tabledata);
                if(result) {
                    socket.emit('cur_race_save', {result: true});
                    socket.to('cur_race').emit('cur_race_update', {time: data.time, name: data.name, dataArray: data.tabledata});
                    console.log('cur_race_save is processed');
                } else {
                    socket.emit('cur_race_save', {result: false, error: 'Error occurred while save current race info'});
                }
            });

            socket.on('next_race_save', async (data) => {
                console.log('next_race_save request is received');
                if(!data) {
                    //Error data is undefined
                    socket.emit('next_race_save', {result: false, error: 'The info of next race must be supplied'});
                    return;
                }
                if(!data.time || data.time ==='') {
                    //Error data.time is not supplied
                    socket.emit('next_race_save', {result: false, error: 'Time of next race is not supplied'});
                    return;
                }
                if(!data.name || data.name ==='') {
                    //Error data.name is not supplied
                    socket.emit('next_race_save', {result: false, error: 'Name of next race is not supplied'});
                    return;
                }
                if(!data.tabledata || data.tabledata.length == 0) {
                    //Error data.tabledata is not supplied
                    socket.emit('next_race_save', {result: false, error: 'Runner info is not supplied'});
                    return;
                }

                //save to nextraceinfo model
                let result = await Resource.editResource({next_race_time: data.time, next_race_name: data.name});
                if(!result.result) {
                    //Emit error message
                    socket.emit('next_race_save', {result: false, error: 'Error occurred while save next race info'});
                    return;
                }

                //Format of data.tabledata is [{name: '...', sp: '...'}]
                result = await NextRaceInfo.editNextRaceInfo(data.tabledata);
                if(result) {
                    socket.emit('next_race_save', {result: true});
                    socket.to('next_race').emit('next_race_update', {time: data.time, name: data.name, dataArray: data.tabledata});
                    console.log('next_race_save is processed');
                } else {
                    socket.emit('next_race_save', {result: false, error: 'Error occurred while save next race info'});
                }
            });

            socket.on('stream_url_save', async (url) => {
                console.log('stream_url_save request is received');
                if(!url) {
                    console.log('stream_url is not supplied');
                    socket.emit('stream_url_save', {result: false, error: 'Stream_url must be supplied'});
                    return;
                }
                
                let result = await Resource.editResource({stream_url: url});
                if(!result.result) {
                    socket.emit('stream_url_save', {result: false, error: 'Error occurred while save stream url'});
                    return;
                }

                socket.emit('stream_url_save', {result: true});
                socket.to('stream_url').emit('stream_url_update', {url: url});
                console.log('stream_url_save is processed');
            });

            socket.on('card_title_save', async (data) => {
                console.log('card_title_save request is received');
                if(!data.title) {
                    console.log('Error: pdf url or card tile is not supplied');
                    socket.emit('card_title_save', {result: false, error: 'Pdf url and card title must be supplied'});
                    return;
                }

                let result = await Resource.editResource({card_title: data.title});
                if(!result.result) {
                    socket.emit('card_title_save', {result: false, error: 'Error occurred while save card info'});
                    return;
                }

                socket.emit('card_title_save', {result: true});
                socket.to('card_title').emit('card_title_update', {card_title: data.title});
                console.log('card_title_save is processed');
            });

            socket.on('tips_info_save', async (data) => {
               console.log('tip_info_save request is received');
               if(!data.title) {
                   console.log('Error: tip source title is not supplied');
                   socket.emit('tips_info_save', {result: false, error: 'Tip source title must be supplied'});
                   return;
               }
               if(!data.tabledata || data.tabledata.length == 0) {
                   //Error data.tabledata is not supplied
                   socket.emit('tips_info_save', {result: false, error: 'Tip info is not supplied'});
                   return;
               }

               let result = await Resource.editResource({tip_info: data.title});
               if(!result.result) {
                   socket.emit('tips_info_save', {result: false, error: 'Error occurred while save tip source'});
                   return;
               }

                //Format of data.tabledata is [{name: '...', sp: '...'}]
                result = await TipsInfo.editTipsInfo(data.tabledata);
                if(!result) {
                    socket.emit('tips_info_save', {result: false, error: 'Error occurred while save tip info'});
                    return;
                }

               socket.emit('tips_info_save', {result: true});
               socket.to('tip_info').emit('tips_info_update', {title: data.title, dataArray: data.tabledata});
               console.log('tips_info_save is processed');
            });

            socket.on('odd_info_save', async (data) => {
               console.log('odd_info_save request is received');
               if(!data.tabledata || data.tabledata.length == 0) {
                   //Error data.tabledata is not supplied
                   socket.emit('odd_info_save', {result: false, error: 'odd info is not supplied'});
                   return;
               }

                //Format of data.tabledata is [{name: '...', sp: '...'}]
                result = await OddsInfo.editOddsInfo(data.tabledata);
                if(!result) {
                    socket.emit('odd_info_save', {result: false, error: 'Error occurred while save odd info'});
                    return;
                }

               socket.emit('odd_info_save', {result: true});
               socket.to('odd_info').emit('odd_info_update', {dataArray: data.tabledata});
               console.log('odd_info_save is processed');
            });
            
            socket.on('feed_category_save', async (category) => {
               console.log('feed_category_save request is received');
               if(!category) {
                   console.log('Error: Feed category is not supplied');
                   socket.emit('feed_category_save', {result: false, error: 'Feed category must be supplied'});
                   return;
               }

               let result = await Resource.editResource({feed_category: category});
               if(!result.result) {
                   socket.emit('feed_category_save', {result: false, error: 'Error occurred while save feed category'});
                   return;
               }

               socket.emit('feed_category_save', {result: true});
               socket.to('feed_category').emit('feed_category_update', {category: category});
               console.log('feed_category_save is processed');
            });

            socket.on('betting_info_save', async (data) => {
                console.log('betting_info_save request is received');
                if(!data) {
                    console.log('Error: Betting info is not supplied');
                    socket.emit('betting_info_save', {result: false, error: 'Betting info must be supplied'});
                    return;
                }

                let result;
                result = await BettingInfo.insertBettingInfo(data);
                if(!result) {
                    socket.emit('betting_info_save', {result: false, error: 'Error occurred while save betting info'});
                    return;
                }

                result = await BettingInfo.getBettingInfo();
                if(!result.result) {
                    socket.emit('betting_info_save', {result: false, error: 'Error occurred while save betting info'});
                    return;
                }

                socket.emit('betting_info_save', {result: true});
                socket.to('betting_info').emit('betting_info_update', result.result);
                console.log('betting_info_save is processed');
            });

        });
    },
};

module.exports = exportedMethods;