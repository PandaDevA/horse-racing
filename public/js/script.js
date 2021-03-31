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