const User = require('../models/users');
const bcrypt = require('bcrypt');

const registerUser = async(data, ipaddr) => {
    const { name, email, username, password } = data;
    let error = '';

    //Check if any field is empty
    if (!name || !email || !username || !password) {
        error = 'All fields are required';
        console.log('error while regitser: ', error);
        return { result: false, error: error };
    }

    try {
        let feedback = false;
        //Check if user email already exists
        feedback = await User.exists({ email: email });
        if (feedback) {
            error = `Email already exists, Try another!`;
            console.log('error while regitser: ', error);
            console.log('name', name);
            return { result: false, error: error };
        }

        //Check if user username already exists
        feedback = await User.exists({ username: username });
        if (feedback) {
            error = 'Username already exists, Try another!';
            console.log('error while regitser: ', error);
            console.log('name', name);
            return { result: false, error: error };
        }

        //Hash Password
        const hashedPass = await bcrypt.hash(password, 10)

        //Create a user
        const userInf = {
            name: name,
            email: email,
            username: username,
            password: hashedPass,
        };
        if(data.company) userInf.company = data.company;
        if(ipaddr) userInf.ipaddress = ipaddr;
        if(data.access) userInf.access = data.access;
        const user = new User(userInf);
        const returnInfo = await user.save();
        if (returnInfo) {
            console.log(`register success: ${name}`);
            return {
                result: returnInfo,
                error: ''
            };
        } else {
            console.log(`error while register: ${returnInfo}`);
            return {
                result: false,
                error: 'Unkown database error'
            };
        }
    } catch (e) {
        console.log('error while register: ', e.message);
        return { result: false, error: e.message };
    }
}

const getUserByName = async(username) => {
    let result = {};
    await User.findOne({ username: username }, (err, data) => {
        if(err) console.log('Error while getUserByName: ', err);
        result = { result: data, error: err };
    });
    return result;
}

const getUserById = async(id) => {
    let result = {result: {}, error: ''};
    await User.findById(id, (err, data) => {
        if(err) console.log(`Error while getUserById: `, err);
        result = { result: data, error: err };        
    });
    return result;
}

const getUserList = async(filter, pageId, countPerPage) => {
    let perPage = countPerPage ? countPerPage : 10;
    let curPage = pageId;
    let result = {};

    let query = {};
    if(filter) query = {
        $or:
        [
            {username: { $regex: filter }},
            {name: { $regex: filter }},
            {email: { $regex: filter }},
            {company: { $regex: filter }},
            {ipaddress: { $regex: filter }}
        ]};

    let count = await User.countDocuments(query);
    if(!count) {
        console.log('could not get the count of users');
        count = 0;
    }
    else console.log(`page count is : ${count}`);

    if(count <= perPage * ( pageId - 1 )) curPage = 1;

    try {
        await User
            .find(query, {}, { skip: perPage * (curPage - 1), limit: Number.parseInt(perPage) }, function(err, data) {
                if(err) console.log(`Error while getUserList: ${err}`);
                result = { result: data, pageInfo: {perPage: perPage, count: count, curPage: curPage}, error: err };        
            });
    } catch (e) {
        console.log(`Error while getUserList: ${e}`);
        result = { error: e };        
    }

    return result;
}

const updateUserDataByName = async(oldusername, data) => {
    user = await getUserByName(oldusername);
    if(!user.result) {
        console.log(`Could not update ${oldusername}'s Data`);
        return { result: false, error: `User is not exist in DB` };
    }

    updateData = {};
    let accessInfo = user.access;
    const idx = accessInfo.indexOf(data.access);
    if(data.method == 'add') {
        if(idx == -1) {
            accessInfo.push(data.access);
        } else {
            return { result: true, error: '' };
        }
    } else {
        if(idx != -1) {
            accessInfo.splice(idx, 1);
        }
        else {
            return { result: false, error: `Access Info, ${data.access}, is not exist in the User's AccessInfo`}
        }
    }

    updateData = {access: accessInfo};

    try {
        result = await User.updateOne({username: oldusername}, updateData);
        return { result: true, error: ''}
    } catch(e) {
        console.log(`Error while updateUserDataByName: ${e.message}`);
        return { result: false, error: e.message};
    }
}

const removeUserByName = async(username) => {
    user = await getUserByName(username);
    if(!user.result) {
        console.log(`${username} is not exist`);
        return { result: false, error: `User is not exist in DB` };
    }

    try {
        result = await User.deleteOne({username: username});
        return { result: result, error: ''}
    } catch(e) {
        console.log(`Error while removeUserByName: ${e.message}`);
        return { result: false, error: e.message};
    }
}

module.exports = {
    registerUser,
    getUserByName,
    getUserById,
    getUserList,
    updateUserDataByName,
    removeUserByName,
};