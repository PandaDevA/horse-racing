$('#cur_race_info_save').click(function(){
    var name = [];
    var sp = [];
    $('#cur_race_info_table').find("info_name").each(function( index ) {
        name.push($( this ).val());
        sp.push($( this ).val());
    });
    Client.socket.emit('cur_race_info_save', {name:name, sp:sp});
});