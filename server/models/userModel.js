const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
        unique:true
    }

})
const User=mongoose.model("User", UserSchema)
module.exports=User;