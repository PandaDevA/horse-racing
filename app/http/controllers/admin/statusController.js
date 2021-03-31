const Order = require('../../../models/order')

function statusController(){
    return {
        update(req, res){
           //here we are updating the status of order in database;
           Order.updateOne({_id: req.body.orderId}, {status: req.body.status}, (err,data)=>{
               if(err){
                   return res.redirect('/admin/orders')
               }
               return res.redirect('/admin/orders');
           })
        }
    }
}

module.exports = statusController;