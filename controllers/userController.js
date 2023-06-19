const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const create_token = async(id)=>{
    try{
        const token = await jwt.sign({ _id:id }, config.secret_jwt);
        return token;
    }
    catch(err){
        console.log(err)
        return res.send({status:400, Message:err});
    }
}
const securePassword = async (password) =>{
    try{
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }
    catch(err){
        console.log(err)
        return res.send({status:400, Message:err});
    }
}

//Register API Methode
const register_user = async (req, res) =>{
    try{
        const spassword = await securePassword(req.body.password);

       const user = new User ({
            name        : req.body.name,
            email       : req.body.email,
            password    : spassword,
            mobile      : req.body.mobile,
        });
        const userData = await User.findOne({email: req.body.email});
        if(userData){
            return res.send({status:200, success:false, Message:"This email is already exist"});
        }
        else{
            const user_data = await user.save();
            return res.send({status:200, success:true, data:user_data});
        }
    }
    catch(err){
        console.log(err)
        return res.send({status:400, Message:err});
    }
}

//login API Method
const user_login = async(req,res) =>{
    try{
        const email     = req.body.email;
        const password  = req.body.password;

       const userData = await User.findOne({ email: email });
       if(userData){
        const passwordMatch = await bcrypt.compare( password, userData.password );
        if(passwordMatch){

           const tokenData = await create_token(userData._id);
            const userResult = {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                password: userData.password,
                mobile: userData.mobile,
                token: tokenData
            }
            const response = {
                success:true,
                msg: "User Details",
                data: userResult
            }
                return res.send({status:200, data:response});
        }
        else{
            return res.send({status:200, success:false, Message: "Login Details are incorrect"});
        }
       }
       else{
        return res.send({status:200, success:false, Message: "Login Details are incorrect"});
       }
    }
    catch(err){
        console.log(err)
        return res.send({status:400, Message:err});
    }
}

//Update Password Method
const update_password = async(req,res)=>{
    try{
        const user_id = req.body.user_id;
        const password = req.body.password;

        const data = await User.findOne ({ _id:user_id });
        if(data){
            const newPassword = await securePassword(password);

            const userData = await User.findByIdAndUpdate({_id:user_id}, { $set: {
                password:newPassword
            }});
            return res.send({status:200, success:true, Message:"Your Password has been Updated"});
        }
        else{
            return res.send({status:200, success:false, Message:"User Id not found"});
        }
    }
    catch(err){
        console.log(err)
        return res.send({status:400, Message:err});
    }
}

//Social Login

const social_login = async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        return res.send({status:400, Message:err});
    }
}

module.exports = {
    register_user,
    user_login,
    update_password,
    social_login
}