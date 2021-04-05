//Database Connection
const mongoose = require('mongoose');
const { registerUser, getUserList, getUserByName, updateUserDataByName, removeUserByName } = require('./app/methods/users');
const { editResource, getResource } = require('./app/methods/resource');
const { editCurRaceInfo, getCurRaceInfo } = require('./app/methods/curraceinfo');
const { editNextRaceInfo, getNextRaceInfo } = require('./app/methods/nextraceinfo');
const { insertBettingInfo, getBettingInfo } = require('./app/methods/bettinginfo');
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
        able_pages: ["home", "card", "contact"],
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
        able_pages: ["all"],
        // subscription: true,
    }
];

const raceData = [{
        name: 'LAJUSARI NOA',
        sp: '13/1',
        color: 'blue',
    },
    {
        name: 'LAJUSARI NOA',
        sp: '5/1',
        color: 'red',
    },
    {
        name: 'LAJUSARI NOA',
        sp: '15/1',
        color: 'none',
    },
    {
        name: 'LAJUSARI NOA',
        sp: '10/1',
        color: 'red',
    },
    {
        name: 'LAJUSARI NOA',
        sp: '5/1',
        color: 'blue',
    },
];

const bettingData = [{
        time: '4.00',
        name: 'Valapora',
        text: 'Text description of Valapora'
    },
    {
        time: '8.00',
        name: 'Valapora',
        text: 'Text description of Valapora'
    },
    {
        time: '5.20',
        name: 'Valapora',
        text: 'Text description of Valapora'
    },
    {
        time: '6.00',
        name: 'Valapora',
        text: 'Text description of Valapora'
    }
];

const resourceData = {
    cur_race_time: '4:00',
    cur_race_name: 'Valparaiso - Race 1',
    next_race_time: '4:28',
    next_race_name: 'Valparaiso - Race 2 LIVE',
    stream_url: 'https://rudo.video/live/sportinghd',
    pdf_url: '/file/card.pdf',
    card_title: 'Valparaiso race card - Thursday 25th March 2021',
    tip_source: 'Concepcion 25th March 2021',
    feed_category: 'Concepcion',
};

async function main() {
    let result = await connection.dropDatabase();
    console.log('database droped : ', result);
    await registerUser(userData[0]);
    await registerUser(userData[2]);
    // console.log(await removeUserByName('user3'));
    console.log(await getUserList());
    // console.log(await getUserByName('user2'));
    // console.log(await updateUserDataByName('user1', {able_pages: ['a', 'b']}));
    // console.log(await updateUserDataByName('user1', {able_pages: ['a']}));
    console.log(await updateUserDataByName('user1', {able_pages: ['a', 'b', 'c']}));
    console.log(await editResource(resourceData));
    console.log(await getResource());
    console.log(await editCurRaceInfo(raceData));
    console.log(await getCurRaceInfo());
    console.log(await editNextRaceInfo(raceData));
    console.log(await getNextRaceInfo());
    console.log(await insertBettingInfo(bettingData));
    console.log(await getBettingInfo());

    await connection.close();
};