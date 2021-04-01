const User = require('./app/models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Database Connection

const url = 'mongodb://192.168.104.56:8001/horse-racing';
// const url = 'mongodb://localhost:8001/horse-racing';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected..');
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

const registerUser = async(idx) => {

    console.log(`Start registerUser ${idx}`);
    const { name, email, username, password } = userData[idx];

    //Check if any field is empty
    if (!name || !email || !username || !password) {
        console.log('error while regitser: ', 'All fields are required');
        console.log('name', name);
        console.log('email', email);
        return;
    }

    //Check if user email already exists
    User.exists({ email: email }, (err, result) => {
        if (result) {
            console.log('error while regitser: ', 'Email already exists, Try another!')
            console.log('name', name);
            console.log('email', email);
            return;
        }
    })

    //Check if user username already exists
    User.exists({ username: username }, (err, result) => {
        if (result) {
            console.log('error while regitser: ', 'Username already exists, Try another!')
            console.log('name', name);
            console.log('username', username);
            return;
        }
    })

    //Hash Password
    const hashedPass = await bcrypt.hash(password, 10)

    //Create a user
    const user = new User({
        name: name,
        email: email,
        username: username,
        password: hashedPass
    })
    user.save().then(() => {
        //Login
        console.log('go to login');
    }).catch((err) => {
        console.log('error while register:', err.message);
    })

    console.log(`Parse registerUser ${idx}`);
}

async function main() {
    await connection.dropDatabase();
    registerUser(0);
    registerUser(1);
    await connection.close();
};

main();