const Order = require('../../../models/order')
const moment = require('moment');
const { json } = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

function orderController() {
    return {
        async index(req, res) {
            const order = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } });

            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            return res.render('customers/order', { orders: order, moment: moment });
        },

        store(req, res) {
            //Validate req
            const { phone, address, stripeToken, paymentType } = req.body;
            if (!phone || !address) {
                return res.status(422).json({ message: 'All fields are mandatory' });
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            });
            order.save().then(result => {
                Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                    //Stripe Payment

                    if (paymentType == 'card') {
                        stripe.charges.create({
                            amount: req.session.cart.totalPrice * 100,
                            source: stripeToken,
                            currency: 'inr',
                            description: `Pizza Order : ${placedOrder._id}`,
                        }).then(() => {
                            placedOrder.paymentStatus = true;
                            placedOrder.save().then((r) => {

                                delete req.session.cart;
                                return res.json({ message: 'Payment Successful, Order Placed Successfully' });

                            }).catch(err => {
                                console.log(err);
                            });
                        }).catch(err=>{
                            //Payment failed
                            console.log(err);
                            delete req.session.cart;
                            return res.json({ message: 'OrderPlaced but Payment failed, Pay at delivery time' });

                        })
                    }else{
                        delete req.session.cart;
                        return res.json({ message: 'Order Placed Successfully' });
                    }
                })

            }).catch(err => {
                // req.flash('error', 'Something went wrong, try again!');
                console.log(err);
                return res.status(500).json({ message: 'Something went wrong, try again!' });
            })
        },
        async order(req, res) {
            const order = await Order.findById(req.params.id);
            if ((req.user._id).toString() == (order.customerId).toString()) {
                return res.render('customers/singleOrder', { order: order });
            }
            return res.render('/');
        }
    }
}

module.exports = orderController