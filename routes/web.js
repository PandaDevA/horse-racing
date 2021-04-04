const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminSettingController = require('../app/http/controllers/admin/settingController');
const statusController = require('../app/http/controllers/admin/statusController');

//Middelwares
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');


function initRoute(app) {
    app.get('/', authController().login)
    app.get('/home', auth, homeController().index)

    app.get('/login', authController().login)

    app.post('/login', authController().postLogin)

    app.get('/register', authController().login)

    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    //Customer Routes
    app.post('/order', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().order)



    //Admin Routes
    app.get('/admin/setting', admin, adminSettingController().index);
}




module.exports = initRoute;