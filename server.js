require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const sharedsession = require('express-socket.io-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const util = require('util');
const flash = require('express-flash');
const MongoDBStore = require('connect-mongo')(session); // It will store our session id in database.
const passport = require('passport');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const connection = require('./app/config/dbConnection');
const socketSrc = require('./app/socket');

//Session Store
let mongoStore = new MongoDBStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

//Session Config
const appsession = session({
    secret: "horse-racing",
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
});
app.use(appsession);
io.use(sharedsession(appsession));


// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//Assets
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.json());

//Passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//Global Middleware to use session and user(if logged in) in client side
app.use(cors());
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user
    next();
})

//Set Template Engine
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
let log_stdout = process.stdout;

console.log = function(d) { //
  const now = new Date();
  log_file.write( now.toLocaleTimeString()+ ' ' + util.format(d) + '\n');
  log_stdout.write( now.toLocaleTimeString()+ ' ' + util.format(d) + '\n');
};

//Set Route
require('./routes/web.js')(app);
socketSrc.useSocket(io).then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log('Listening on port 3000');
    })
});