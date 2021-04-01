const User = require('../models/users');
const bcrypt = require('bcrypt');

const registerUser = async(data) => {
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
        const user = new User({
            name: name,
            email: email,
            username: username,
            password: hashedPass
        })
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

module.exports = { registerUser };