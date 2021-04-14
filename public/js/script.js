$( '#view_stream' ).click(function() {
    $('#stream_preview').attr('src',$('#stream_url').val());
});

$('body').on('click', '.Cur-Race-Delete', function(){
    $(this).closest('tr').remove();
    update_row_num('#cur_race_info_table');
})

$('#cur_race_info_add').click(function(){
    $('#cur_race_info_table').append("<tr><td class='border px-4 py-2 row_num'></td>"+
    "<td class='border px-4 py-2'><input class='info_name' name='name' type='text' value='' placeholder='Name'/></td>"+
    "<td class='border px-4 py-2'><input class='info_sp' name='sp' type='text' value='' placeholder='SP'/></td>"+
    "<td class='border px-4 py-2'>" +
    "<select class = 'info_color'>"+
        "<option class = 'Color_None' value='Color_None' selected>None</option>"+
        "<option class = 'Color_Blue' value='Color_Blue' >Blue</option>"+
        "<option class = 'Color_Red' value='Color_Red' >Red</option>"+
    "</select>"+
    "</td>"+
    "<td class='border px-4 py-2'><button type='button' class='Cur-Race-Delete'>Delete</button></td></tr>");
    
    update_row_num('#cur_race_info_table');
})

$('#cur_race_info_clear').click(function(){
    $('#cur_race_info_table').html("");
})

$('body').on('click', '.Next-Race-Delete', function(){
    $(this).closest('tr').remove();
    update_row_num('#next_race_info_table');
})

$('#next_race_info_add').click(function(){
    $('#next_race_info_table').append("<tr><td class='border px-4 py-2 row_num'></td>"+
    "<td class='border px-4 py-2'><input class='info_name' name='name' type='text' value='' placeholder='Name'/></td>"+
    "<td class='border px-4 py-2'><input class='info_sp' name='sp' type='text' value='' placeholder='SP'/></td>"+
    "<td class='border px-4 py-2'>" +
    "<select class = 'info_color'>"+
        "<option class = 'Color_None' value='Color_None' selected>None</option>"+
        "<option class = 'Color_Blue' value='Color_Blue' >Blue</option>"+
        "<option class = 'Color_Red' value='Color_Red' >Red</option>"+
    "</select>"+
    "</td>"+
    "<td class='border px-4 py-2'><button type='button' class='Next-Race-Delete'>Delete</button></td></tr>");
    
    update_row_num('#next_race_info_table');
})

$('#next_race_info_clear').click(function(){
    $('#next_race_info_table').html("");
})

$('body').on('click', '.Betting-Delete', function(){
    $(this).closest('tr').remove();
    update_row_num('#betting_info_table');
});

$('body').on('click', '.Betting-Update', function(){
    $(this).closest('tr').find('td > input').each(function(index){
        $(this).attr('temp', $(this).val());
        $(this).removeAttr('readonly');
    });
    $(this).closest('tr').find('td > textarea').each(function(index){
        $(this).attr('temp', $(this).text());
        $(this).removeAttr('readonly');
    });
    $(this).addClass('hide');
    $(this).siblings('.Betting-Delete').addClass('hide');
    $(this).siblings('.Betting-Cancel').removeClass('hide');
    $(this).siblings('.Betting-Save').removeClass('hide');
});

$('body').on('click', '.Betting-Cancel', function(){
    $(this).closest('tr').find('td > input').each(function(index){
        $(this).val($(this).attr('temp'));
        $(this).attr('readonly', true);
    });
    $(this).closest('tr').find('td > textarea').each(function(index){
        $(this).text($(this).attr('temp'));
        $(this).attr('readonly', true);
    });
    $(this).siblings('.Betting-Update').removeClass('hide');
    $(this).siblings('.Betting-Delete').removeClass('hide');
    $(this).addClass('hide');
    $(this).siblings('.Betting-Save').addClass('hide');
});

$('body').on('click', '.Betting-Save', function(){
    $(this).siblings('.Betting-Update').removeClass('hide');
    $(this).siblings('.Betting-Delete').removeClass('hide');
    $(this).addClass('hide');
    $(this).siblings('.Betting-Cancel').addClass('hide');
    $(this).closest('tr').find('td > input').each(function(index){
        $(this).attr('readonly', true);
    });
    $(this).closest('tr').find('td > textarea').each(function(index){
        $(this).attr('readonly', true);
    });
    $('#betting_info_table').prepend($(this).closest('tr').clone());
    $(this).closest('tr').remove();
    update_row_num('#betting_info_table');
});

$('#betting_info_add').click(function(){
    $('#betting_info_table').prepend(
        "<tr>"+
        "<td class='border px-4 py-2 row_num'>"+
        "</td>"+
        "<td class='border px-4 py-2'>"+
        "<input class='info_time' type='text' value='' placeholder='Time' readonly/>"+
        "</td>"+
        "<td class='border px-4 py-2'>"+
        "<input class='info_name' type='text' value='' placeholder='Name'  readonly/>"+
        "</td>"+
        "<td class='border px-4 py-2'>"+
        "<textarea class='info_text' placeholder='Description'  readonly></textarea>"+
        "</td>"+
        "<td class='border px-4 py-2'>"+
        "<button type='button' class='Betting-Update'>Update</button>"+
        "<button type='button' class='Betting-Delete'>Delete</button>"+
        "<button type='button' class='Betting-Save hide'>Save</button>"+
        "<button type='button' class='Betting-Cancel hide'>Cancel</button>"+
        "</td></tr>");
    update_row_num('#betting_info_table');
})

$('body').on('click', '.Tips-Info-Delete', function(){
    $(this).closest('tr').remove();
})

$('#tips_info_add').click(function(){
    $('#tips_info_table').append("<tr>"+
    "<td class='border py-2'>"+
        "<input class='info_race' type='text' value='' placeholder='Race'/>"+
    "</td>"+
    "<td class='border py-2'>"+
        "<input class='info_selection' type='text' value='' placeholder='Selection'/>"+
    "</td>"+
    "<td class='border py-2'>"+
        "<input class='info_notes' type='text' value='' placeholder='Notes'/>"+
    "</td>"+
    "<td class='border py-2'>"+
        "<button type='button' class='Tips-Info-Delete'>Delete</button>"+
    "</td>"+
    "</tr>");
})

$('body').on('click', '#tips_info_clear', function(){
    $('#tips_info_table').html("");
})

function update_user(filter, page, count){
    $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
    $.ajax({
        url : '/admin/setting/user',
        type : 'POST',
        data : {
            filter: filter,
            page: page,
            count: count
        },
        success : function(data) {
            if(!data.pageInfo)return;
            $('#user-pagination').empty();
            let pageCount = Math.ceil(data.pageInfo.count / data.pageInfo.perPage);
            if ( pageCount> 0) {
                let content = "";
                content+="<ul class='pagination text-center'>";
                if (data.pageInfo.curPage == 1) {
                    content+="<li class='disabled'>First</li>";
                } else {
                    content+="<li data-page='1'>First</li>";
                }
                var i = (Number(data.pageInfo.curPage) > 5 ? Number(data.pageInfo.curPage) - 4 : 1);
                if (i !== 1) {
                    content+="<li class='disabled'>...</li>";
                }
                for (; i <= (Number(data.pageInfo.curPage) + 4) && i <= pageCount; i++) {
                    if (i == data.pageInfo.curPage) {
                        content+="<li class='active'>" + i  + "</li>";
                    } else {
                        content+="<li data-page='" + i + "'>" + i + "</li>";
                    }
                    if (i == Number(data.pageInfo.curPage) + 4 && i < pageCount) {
                        content+="<li class='disabled'>...</li>";
                    }
                }
                if (data.pageInfo.curPage == pageCount) {
                    content+="<li class='disabled'>Last</li>";
                } else {
                    content+="<li data-page='" + pageCount + "'>Last</li>";
                }
                content+="</ul>";
                $('#user-pagination').html(content);
            }
            $('#user_table').empty();
            for(var i=0; i<data.result.length; i++) {
                var createDate = new Date(data.result[i].createdAt);
                $('#user_table').append("<tr class='"+ (data.result[i].status ? 'online' : 'offline')+"'>"+
                    "<td class='border usercell py-2 text-center'>"+
                        data.result[i].name+
                    "</td>"+
                    "<td class='border usercell py-2 text-center'>"+
                        data.result[i].email+
                    "</td>"+
                    "<td class='border usercell py-2 text-center'>"+
                        data.result[i].username+
                    "</td>"+
                    "<td class='border usercell py-2 text-center'>"+
                        data.result[i].company+
                    "</td>"+
                    "<td class='border usercell py-2 text-center'>"+
                        data.result[i].ipaddress+
                    "</td>"+ 
                    '<td class="border usercell py-2 text-center">'+
                        createDate.toLocaleString()+
                    '</td>'+
                    "<td class='border usercell py-2' data-username='" + data.result[i].username + "'>"+
                    "<div style='width: 92px;'>" +
                        "<input type='checkbox' name='cards' value='cards' " + (data.result[i].access.includes('cards')? 'checked':'') + " >"+
                        "<label for='cards'>&nbspCards</label>"+
                    "</div>"+
                    "<div style='width: 92px;'>"+
                        "<input type='checkbox' name='odds' value='odds' " + (data.result[i].access.includes('odds')? 'checked':'') + ">" +
                        "<label for='odds'>&nbspOdds</label>"+
                    "</div>"+
                    "<div style='width: 92px;'>"+
                        "<input type='checkbox' name='tips' value='tips' " + (data.result[i].access.includes('tips')? 'checked':'') + ">" +
                        "<label for='tips'>&nbspTips</label>"+
                    "</div>"+
                    "<div style='width: 92px;'>"+
                        "<input type='checkbox' name='next_race' value='next_race' " + (data.result[i].access.includes('next_race')? 'checked':'') + ">" +
                        "<label for='next_race'>&nbspNext Race</label>"+
                    "</div>"+
                    "</td>"+
                    "<td class='border usercell py-2 text-center' data-username='" + data.result[i].username + "'>"+
                        "<button type='button' class='User-Delete'>Delete</button>" +
                    "</td>" +
                    "</tr>");
            } 
        },
        error: function(data){
        }
    });
}

$('body').on('click', '#user_find', function(){
    update_user($('#user_filter').val(), 1,  $('#user_perPage').val());
})

$('body').on('change', '#user_perPage', function(){
    update_user($('#user_filter').val(), 1,  $('#user_perPage').val());
})

$('body').on('click', '#user-pagination li', function(){
    if(!$(this).data('page'))
        return;
    update_user($('#user_filter').val(), $(this).data('page'),  $('#user_perPage').val());
})

$('body').on('click', '.User-Delete', function(){
    var returnVal = confirm("Are you sure?");
    if(returnVal) {
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/admin/setting/user/delete',
            type : 'POST',
            data : {
                username: $(this).closest('td').data('username'),
            },
            success : function(data) {
                var filter = $('#user_filter').val();
                var page = 1;
                var perPage = $('#user_perPage').val();
                update_user(filter, page, perPage);
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
            }
        });
    }
})

function update_row_num(tbl_class){
    $(tbl_class).find("tr > td.row_num").each(function( index ) {
        $( this ).html(index+1);
    });
}

$('body').on('click', '#stream_toggle', function(){
    if($('#stream_preview').hasClass('hide')){
        $('#stream_preview').toggleClass('hide');
        $('#stream_preview').fadeIn("slow");
    }else{
        $('#stream_preview').fadeOut("slow", function(){
            $('#stream_preview').toggleClass('hide');
        })
    }
})

$('body').on('change', '#user_table input:checkbox', function(){
    var returnVal = confirm("Are you sure?");
    if(!returnVal)
        $(this).prop("checked", !this.checked);
    else{
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/admin/setting/user/access',
            type : 'POST',
            data : {
                username: $(this).closest('td').data('username'),
                type: $(this).val(),
                checked: this.checked,
            },
            success : function(data) {
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
                $(this).prop("checked", !$(this).checked);
            }
        });
    }
});

$('body').on('click', '.Odds-Info-Delete', function(){
    $(this).closest('tr').remove();
})

$('#odds_info_add').click(function(){
    var excelList=[];
    $('#odds_file_table').find(".Odd-File-Name").each(function( index ) {
        excelList.push($( this ).html());
    });
    let content = "";
    content += "<tr><td class='border py-2'>"+
    "<input class='info_date' type='text' value='' placeholder='Date'/>"+
    "</td>"+
    "<td class='border py-2'>"+
    "<input class='info_meeting' type='text' value='' placeholder='Meeting'/>"+
    "</td>"+
    "<td class='border py-2'>"+
    "<input class='info_overnight' type='text' value='' placeholder='Overnight'/>"+
    "</td>"+
    "<td class='border py-2'>"+
    "<select class='info_overnighturl'>"+
    "<option value='' selected >None</option>";
    for(var i=0; i<excelList.length; i++) {
        content += "<option class = '" + excelList[i] + "' value='" + excelList[i] + "'>" + excelList[i] + "</option>";
    }
    content += "</select>" + 
    "</td>" + 
    "<td class='border py-2'>" + 
    "<input class='info_morning' type='text' value='' placeholder='Morning'/>"+
    "</td>"+
    "<td class='border py-2'>"+
    "<select class='info_morningurl'>"+
    "<option value='' selected >None</option>";
    for(var i=0; i<excelList.length; i++) {
        content += "<option class = '" + excelList[i] + "' value='" + excelList[i] + "'>" + excelList[i] + "</option>";
    }
    content += "</select>"+
    "</td>"+
    "<td class='border py-2'>"+
    "<button type='button' class='Odds-Info-Delete'>Delete</button>"+
    "</td>";
    $('#odds_info_table').append(content);
})

$('body').on('click', '#odds_info_clear', function(){
    $('#odds_info_table').html("");
})

$(document).ajaxStop($.unblockUI);