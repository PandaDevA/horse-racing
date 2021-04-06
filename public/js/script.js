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
    "<td class='border px-4 py-2'><button type='button' class='Cur-Race-Delete'>Delete</button></td></tr>");
    
    update_row_num('#cur_race_info_table');
})

$('body').on('click', '.Next-Race-Delete', function(){
    $(this).closest('tr').remove();
    update_row_num('#next_race_info_table');
})

$('#next_race_info_add').click(function(){
    $('#next_race_info_table').append("<tr><td class='border px-4 py-2 row_num'></td>"+
    "<td class='border px-4 py-2'><input class='info_name' name='name' type='text' value='' placeholder='Name'/></td>"+
    "<td class='border px-4 py-2'><input class='info_sp' name='sp' type='text' value='' placeholder='SP'/></td>"+
    "<td class='border px-4 py-2'><button type='button' class='Next-Race-Delete'>Delete</button></td></tr>");
    
    update_row_num('#next_race_info_table');
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
        "<textarea class='info_text' value='' placeholder='Description'  readonly></textarea>"+
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
    update_row_num('#tips_info_table');
})

$('#tips_info_add').click(function(){
    $('#tips_info_table').append("<tr>"+
    "<td class='border px-4 py-2'>"+
        "<input class='info_race' type='text' value='' placeholder='Name'/>"+
    "</td>"+
    "<td class='border px-4 py-2'>"+
        "<input class='info_selection' type='text' value='' placeholder='Name'/>"+
    "</td>"+
    "<td class='border px-4 py-2'>"+
        "<input class='info_price' type='text' value='' placeholder='SP'/>"+
    "</td>"+
    "<td class='border px-4 py-2'>"+
        "<input class='info_notes' type='text' value='' placeholder='SP'/>"+
    "</td>"+
    "<td class='border px-4 py-2'>"+
        "<button type='button' class='Tips-Info-Delete'>Delete</button>"+
    "</td>"+
    "</tr>");
})

function update_row_num(tbl_class){
    $(tbl_class).find("tr > td.row_num").each(function( index ) {
        $( this ).html(index+1);
    });
}

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then((res) => {
        cartCounter.innerText = res.data.totalQty;

        //Notification bar
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);

    })
})
const msgSuccess = document.querySelector('#success-alert');
if (msgSuccess) {
    setTimeout(() => {
        msgSuccess.remove();
    }, 2000)
}

// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)

            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })

}

updateStatus(order);

//Stripe

var stripe = Stripe('pk_test_51IEVCfHhoftjReKeN3wpBu3knbAFghOzgxLN0qQ7xd2G4HMom8hpZ9vlG6jp0Q8e4JzGcCGFCkcBwKaZkKVO0WZg00zBtYZhUt');

const elements = stripe.elements();
let card = null;

function mountCard(){
    card = elements.create('card', { style : {}, hidePostalCode: true });
    card.mount('#card-element');
}

const paymentType = document.querySelector('#paymentType');
if(paymentType){
    paymentType.addEventListener('change', (e) => {
        console.log(e.target.value);
        if (e.target.value == 'card') {
            //Display widget
            mountCard();
        } else {
            card.destroy();
        }
    })
}



//AJAX Call
const paymentForm = document.querySelector('#payment-form');
if(paymentForm){
    paymentForm.addEventListener('submit', (e) => {

        e.preventDefault();
        let formData = new FormData(paymentForm);  //For getting field of form data
        let formObject = {};
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        let stripeToken;
        //Verify Card
        if(card){
            stripe.createToken(card).then((result)=>{
                console.log(result);
                stripeToken = result.token.id;
                formObject.stripeToken = result.token.id;
                console.log(formObject)
                axios.post('/order', formObject).then((res) => {
                    new Noty({
                        type: 'success',
                        timeout: 1000,
                        text: res.data.message,
                        progressBar: false,
                    }).show();
            
                    setTimeout(() => {
                        window.location.href = '/customer/orders';   //Redirecting after AJAX Call;
                    }, 1000)
            
                }).catch((err) => {
                    new Noty({
                        type: 'error',
                        timeout: 1000,
                        text: 'Something went wrong',
                        progressBar: false,
                    }).show();
                    console.log(err);
                })
            }).catch(err=>{
                console.log(err);
            })
        }else{
            console.log('in cod')
            axios.post('/order', formObject).then((res) => {
                new Noty({
                    type: 'success',
                    timeout: 1000,
                    text: res.data.message,
                    progressBar: false,
                }).show();
        
                setTimeout(() => {
                    window.location.href = '/customer/orders';   //Redirecting after AJAX Call;
                }, 1000)
        
            }).catch((err) => {
                new Noty({
                    type: 'error',
                    timeout: 1000,
                    text: 'Something went wrong',
                    progressBar: false,
                }).show();
                console.log(err);
            })
        }

        
    })
}