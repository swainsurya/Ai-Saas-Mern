import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : { type : String , required : true },
    password : { type : String , required : true },
    credits : {type: Number , default : 100}
})

export const userModel = await mongoose.model("User" , userSchema);