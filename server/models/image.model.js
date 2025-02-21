import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imgUrl : {type : String , required : true},
    ownerId : {type : mongoose.Schema.Types.ObjectId , required : true , ref : 'User'}
})

export const imageModel = await mongoose.model('Image', imageSchema)