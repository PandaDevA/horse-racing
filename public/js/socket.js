/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect();

Client.socket.on('cur_race_info_table',function(data){
    if(data.result)
    {
        userData = data.result;
        game.scene.stop('LoginScreen');
        game.scene.start('HomeScreen');
        console.log('success');
    }
    else
    {
        console.log('failed');
    }
});
