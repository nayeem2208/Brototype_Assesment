import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    batch:{
        type:String
    },
    domain:{
        type:String
    }
})

 const userModel=mongoose.model('User',userSchema)
 export default userModel 