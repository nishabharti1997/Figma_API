const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is not Provide"],
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
          type: Number,
        },  
        token : {
            type: String,
            default:''
        }
    },
    {timestamps:true}
);

const user = mongoose.model("USER", UserSchema);
module.exports = user;