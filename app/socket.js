const exportedMethods = {
    
    async useSocket(io) {

        io.on('connection', socket => {
            console.log('a user connected');
            
            socket.on('disconnect', () => {
                console.log('user disconnected');
              
            });
        });
    },
};

module.exports = exportedMethods;