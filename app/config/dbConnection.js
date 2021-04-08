const mongoose = require('mongoose');

//Database Connection

const url = 'mongodb://192.168.104.56:8001/horse-racing';
// const url = 'mongodb://localhost:8001/horse-racing';
//const url = 'mongodb+srv://admin:%21QAZxsw2@puzzle.am9gf.mongodb.net/Horse_racing?authSource=admin&replicaSet=atlas-h19s4z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

try {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true });
} catch (e) {
    console.log('Database could not connect.');
    process.exit(0);
}

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected..');
}).catch(err => {
    console.log('Connection failed..');
})


module.exports = connection;