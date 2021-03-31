const Order = require('../../../models/order')
const moment = require('moment'); //time formater in javascript

function orderController(){
    return {
        index(req, res){
           Order.find({status: {$ne: 'completed'}}, null, {sort: {'createdAt': -1}}) // here we used populated to finduser details using his customerId in user database;
              .populate('customerId', '-password').exec((err, orders)=>{
                  console.log(orders);
                  res.render('admin/order', {orders: orders, moment: moment});
              })
        }
    }
}

module.exports = orderController;