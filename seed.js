//Database Connection
const mongoose = require('mongoose');
const { registerUser } = require('./app/methods/users');

const url = 'mongodb://192.168.104.56:8001/horse-racing';
// const url = 'mongodb://localhost:8001/horse-racing';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected..');
    main();
}).catch(err => {
    console.log('Connection failed..');
})

const userData = [{
        name: "testuser1",
        email: "testuser1@gmail.com",
        username: "user1",
        password: "123456",
    },
    {
        name: "testuser2",
        email: "testuser2@gmail.com",
        username: "user2",
        password: "123456",
    }
];

async function main() {
    let result = await connection.dropDatabase();
    console.log('database droped : ', result);
    await registerUser(userData[0]);
    await registerUser(userData[1]);
    await connection.close();
};