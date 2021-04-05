const CurRaceInfo = require('./methods/curraceinfo');
const NextRaceInfo = require('./methods/nextraceinfo');
const Resource = require('./methods/resource');
const Sessions = require('./models/sessions');

const leaveFromAll = (socket) => {
    socket.leave('stream_url');
    socket.leave('pdf_url');
    socket.leave('cur_race');
    socket.leave('next_race');
    socket.leave('card_title');
    // socket.leave('');
}

const exportedMethods = {
    
    async useSocket(io) {
        await Sessions.deleteMany({});

        io.on('connection', socket => {
            console.log('a user connected');
            
            socket.on('disconnect', () => {
                console.log('user disconnected');
                leaveFromAll(socket);
            });

            socket.on('join', (data) => {
                console.log('join request received');

                //join Urls are in data.joinTo as Array like this: data = {joinTo: ['stream_url', 'pdf_url' ...]}
                //same as urls which in leaveFromAll func
                console.log(data.joinTo);
                leaveFromAll(socket);
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
                if(!data.tabledata || data.tabeldata.length == 0) {
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
                if(!data.tabledata || data.tabeldata.length == 0) {
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
                    socket.emit('stream_url_save', {result: false, error: 'Error occurred while save stream url save'});
                    return;
                }

                socket.emit('stream_url_save', {result: true});
                console.log('stream_url_save is processed');
            });

            socket.on('pdf_url_save', async (data) => {
                console.log('pdf_url_save request is received');
                if(!data.url || !data.title) {
                    console.log('Error: pdf url or card tile is not supplied');
                    socket.emit('pdf_url_save', {result: false, error: 'Pdf url and card title must be supplied'});
                }

                let result = await Resource.editResource({pdf_url: data.url, card_title: data.title});
                if(!result.result) {
                    socket.emit('pdf_url_save', {result: false, error: 'Error occurred while save pdf url save'});
                    return;
                }

                socket.emit('pdf_url_save', {result: true});
                console.log('pdf_url_save is processed');
            });
        });
    },
};

module.exports = exportedMethods;