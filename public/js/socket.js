/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect();
Client.socket.emit('join', {joinTo: join_events});

Client.socket.on('cur_race_update',function(data){
    $('#cur_race_title').html(data.time + " " + data.name);
    $('#cur_race_info_table').html('');
    for(let i=0; i<data.dataArray.length; i++)
    {
        $('#cur_race_info_table').append("<tr><td class='border px-4 py-2 row_num'></td>"+
        "<td class='border px-4 py-2'>" + data.dataArray[i].name + "</td>"+
        "<td class='border px-4 py-2'>" + data.dataArray[i].sp + "</td></tr>");
    }
    update_row_num('#cur_race_info_table');
});

Client.socket.on('next_race_update',function(data){
    $('#next_race_title').html(data.time + " " + data.name);
    $('#next_race_info_table').html('');
    for(let i=0; i<data.dataArray.length; i++)
    {
        $('#next_race_info_table').append("<tr><td class='border px-4 py-2 row_num'></td>"+
        "<td class='border px-4 py-2'>" + data.dataArray[i].name + "</td>"+
        "<td class='border px-4 py-2'>" + data.dataArray[i].sp + "</td></tr>");
    }
    update_row_num('#next_race_info_table');
});

Client.socket.on('stream_url_update',function(data){
    $('#stream_preview').attr('src',data.url);
});
