$('#cur_race_info_save').click(function(){
    var tabledata = [];
    var name = [];
    var sp = [];
    $('#cur_race_info_table').find(".info_name").each(function( index ) {
        name.push($( this ).val());
    });
    $('#cur_race_info_table').find(".info_sp").each(function( index ) {
        sp.push($( this ).val());
    });
    for(let i=0; i<name.length; i++)
        tabledata.push({name:name[i], sp:sp[i]});
    Client.socket.emit('cur_race_save', {tabledata: tabledata, time:$('#cur_race_time').val(), name:$('#cur_race_name').val()});
});

Client.socket.on('cur_race_save', function(data){
    if(data.result){
        $('#message-box').first().removeClass('error').addClass('succeed').addClass('show').html('Update Succeed');
    }
    else
    {
        $('#message-box').first().removeClass('succeed').addClass('error').addClass('show').html(data.error);
    }
});

$('#next_race_info_save').click(function(){
    var tabledata = [];
    var name = [];
    var sp = [];
    $('#next_race_info_table').find(".info_name").each(function( index ) {
        name.push($( this ).val());
    });
    $('#next_race_info_table').find(".info_sp").each(function( index ) {
        sp.push($( this ).val());
    });
    for(let i=0; i<name.length; i++)
        tabledata.push({name:name[i], sp:sp[i]});
    Client.socket.emit('next_race_save', {tabledata: tabledata, time:$('#next_race_time').val(), name:$('#next_race_name').val()});
});

Client.socket.on('next_race_save', function(data){
    if(data.result){
        $('#message-box').first().removeClass('error').addClass('succeed').addClass('show').html('Update Succeed');
    }
    else
    {
        $('#message-box').first().removeClass('succeed').addClass('error').addClass('show').html(data.error);
    }
});

$('#stream_url_save').click(function(){
    Client.socket.emit('stream_url_save', $('#stream_url').val());
});

$('#card_title_save').click(function(){
    Client.socket.emit('card_title_save', $('#card_title').val());
});

Client.socket.on('stream_url_save', function(data){
    if(data.result){
        $('#message-box').first().removeClass('error').addClass('succeed').addClass('show').html('Update Succeed');
    }
    else
    {
        $('#message-box').first().removeClass('succeed').addClass('error').addClass('show').html(data.error);
    }
});

$('#betting_info_save').click(function(){
    var tabledata = [];
    var time = [];
    var name = [];
    var text = [];
    $('#betting_info_table').find(".info_time").each(function( index ) {
        time.push($( this ).val());
    });
    $('#betting_info_table').find(".info_name").each(function( index ) {
        name.push($( this ).val());
    });
    $('#betting_info_table').find(".info_text").each(function( index ) {
        text.push($( this ).val());
    });
    for(let i=0; i<name.length; i++)
        tabledata.push({time:time[i], name:name[i], text:text[i]});
    Client.socket.emit('betting_info_save', tabledata);
});

Client.socket.on('betting_info_save', function(data){
    if(data.result){
        $('#message-box').first().removeClass('error').addClass('succeed').addClass('show').html('Update Succeed');
    }
    else
    {
        $('#message-box').first().removeClass('succeed').addClass('error').addClass('show').html(data.error);
    }
});

$('#tips_info_save').click(function(){
    var tabledata = [];
    var race = [];
    var selection = [];
    var price = [];
    var notes = [];
    $('#tips_info_table').find(".info_race").each(function( index ) {
        race.push($( this ).val());
    });
    $('#tips_info_table').find(".info_selection").each(function( index ) {
        selection.push($( this ).val());
    });
    $('#tips_info_table').find(".info_price").each(function( index ) {
        price.push($( this ).val());
    });
    $('#tips_info_table').find(".info_notes").each(function( index ) {
        notes.push($( this ).val());
    });
    for(let i=0; i<race.length; i++)
        tabledata.push({race:race[i], selection:selection[i], price:price[i], notes:notes[i]});
    Client.socket.emit('tips_info_save', {tabledata: tabledata, title:$('#tips_source').val()});
});

Client.socket.on('tips_info_save', function(data){
    if(data.result){
        $('#message-box').first().removeClass('error').addClass('succeed').addClass('show').html('Update Succeed');
    }
    else
    {
        $('#message-box').first().removeClass('succeed').addClass('error').addClass('show').html(data.error);
    }
});
