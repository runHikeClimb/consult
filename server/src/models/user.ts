import mongoose from "mongoose";
const { Schema } = mongoose

const userSchema = new Schema({
    email:{
        type:String,
        trim: true,
        required: true,
        unique: true
    },
    lastName:{
        type:String,
        required: false
    },
    firstName:{
        type:String,
        required: false
    },
    middleName:{
        type:String
    },
    password:{
        type:String,
        required: false
    }
});



export default mongoose.model("User", userSchema);