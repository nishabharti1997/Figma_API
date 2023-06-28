require('dotenv').config()
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// const config = require("../config/config");
const jwt = require("jsonwebtoken");

const create_token = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, process.env.JWT_PRIVATE_KEY);
        return token;
    }
    catch (err) {
        console.log(err)
        return res.send({ status: 400, Message: err });
    }
}
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }
    catch (err) {
        console.log(err)
        return res.send({ status: 400, Message: err });
    }
}

//Register API Methode
const register_user = async (req, res) => {
    try {
        const password = req.body.password;

        const confirmpassword = req.body.confirmpassword;

        if (password === confirmpassword) {
            const passwordHash = await securePassword(password);
            // const passwordHash = await bcrypt.hash(password, 10);
            const user = new User({
                firstname: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: passwordHash,
                confirmpassword: passwordHash,
                mobile: req.body.mobile,
                membershipCode: req.body.membershipCode
            });
            // if user email already exist 
            const userData = await User.findOne({ email: req.body.email });
            if (userData) {
                return res.send({ status: 200, success: false, Message: "This email is already exist" });
            }
            const user_data = await user.save();
            return res.send({ status: 200, success: true, data: user_data });
        }
        else {
            return res.send({ status: 400, Message: "password are not same" })
        }
    }
    //     else {
    //     return res.send({ status: 400, Message: "pass" });
    // }
    catch (err) {
        console.log(err)
        return res.send({ status: 400, Message: err });
    }
}

//login API Method
const user_login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                const tokenData = await create_token(userData._id);
                console.log(tokenData)
                const userResult = {
                    email: userData.email,
                    password: userData.password,
                }
                const response = {
                    success: true,
                    msg: "User Details",
                    data: userResult
                }
                return res.send({ status: 200, data: response });
            }
            else {
                return res.send({ status: 200, success: false, Message: "Login Details are incorrect" });
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.send({ status: 400, Message: err });
    }
}

//Update Password Method
// const update_password = async (req, res) => {
//     try {
//         const user_id = req.body.user_id;
//         const password = req.body.password;

//         const data = await User.findOne({ _id: user_id });
//         if (data) {
//             const newPassword = await securePassword(password);

//             const userData = await User.findByIdAndUpdate({ _id: user_id }, {
//                 $set: {
//                     password: newPassword
//                 }
//             });
//             return res.send({ status: 200, success: true, Message: "Your Password has been Updated" });
//         }
//         else {
//             return res.send({ status: 200, success: false, Message: "User Id not found" });
//         }
//     }
//     catch (err) {
//         console.log(err)
//         return res.send({ status: 400, Message: err });
//     }
// }

//Social Login

// const social_login = async (req, res) => {
//     try {

//     }
//     catch (err) {
//         console.log(err)
//         return res.send({ status: 400, Message: err });
//     }
// }


module.exports = {
    register_user,
    user_login,
    // update_password,
    // social_login
}
