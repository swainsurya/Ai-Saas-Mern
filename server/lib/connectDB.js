import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("DB CONNECTED"))
    .catch(() => console.log("DB ERROR"))
}