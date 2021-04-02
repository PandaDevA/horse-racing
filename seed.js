//Database Connection
const mongoose = require('mongoose');
const { registerUser, getUserList, getUserByName, updateUserDataByName, removeUserByName } = require('./app/methods/users');

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
        company: "Oil Group",
        ipaddress: "192.168.104.57",
    },
    {
        name: "testuser2",
        email: "testuser2@gmail.com",
        username: "user2",
        password: "123456",
        company: "Oil Group",
        ipaddress: "192.168.104.55",
    },
    {
        name: "testuser3",
        email: "testuser3@gmail.com",
        username: "user3",
        password: "123456",
        company: "Oil Group",
        ipaddress: "192.168.104.55",
    }
];

async function main() {
    // let result = await connection.dropDatabase();
    // console.log('database droped : ', result);
    // await registerUser(userData[0]);
    await registerUser(userData[2]);
    console.log(await removeUserByName('user3'));
    // console.log(await getUserList());
    // console.log(await getUserByName('user2'));
    // console.log(await updateUserDataByName('user1', {able_pages: ['a', 'b']}));
    // console.log(await updateUserDataByName('user1', {able_pages: ['a']}));
    // console.log(await updateUserDataByName('user1', {able_pages: ['a', 'b', 'c']}));

    await connection.close();
};