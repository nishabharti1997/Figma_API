const config = require("../config/config");
const jwt = require("jsonwebtoken");

const verifyToken = async(req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if(!token){
        return res.send({status:200, success:false, Message:"A token is required for authentication"})
    }
    try{
        const descode = jwt.verify(token, config.secret_jwt);
        req.user = descode
    }
    catch(err){
        console.log(err)
        return res.send({status:400, Message:err});
    }
    return next();
}

module.exports = verifyToken;