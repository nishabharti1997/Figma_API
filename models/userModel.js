const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    require: [true, "name is not provided"]
  },
  lastname:{
    require:true,
    type:String
  },
  email: {
    type: String,
    require: [true, "email is not provided"]
  },
  password: {
    type: String,
    require: true
  },
  confirmpassword: {
    type: String,
    require: true
  },
  mobile: {
    type: Number,
    require: true
  },
  membershipCode: {
    type: String,
    require: true
  }
});

const user = mongoose.model("USER", UserSchema);
module.exports = user;