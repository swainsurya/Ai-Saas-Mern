import { userModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req , res) => {
    const {email , password} = req.body
    try {
        const checkUser = await userModel.findOne({email})
        if(checkUser) {
            return res.status(404).json({message : "User already exists"})
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new userModel({email , password : hashedPassword})
        await newUser.save()
        return res.status(200).json({
            message : "Registration Success",
            newUser
        })
    } catch (error) {
        return res.status(404).json({message : "Internal Server Error"})
    }
}

export const login = async(req, res) => {
    const {email , password} = req.body 
    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).json({message : "User not exists"})
        }
        const comaparePass = await bcryptjs.compareSync(password , user.password);
        if(!comaparePass) {
            return res.status(404).json({message : "Password incorrect"});
        }
        const token = await jwt.sign({userId : user._id},process.env.JWT_KEY,{"expiresIn" : "2d"});
        res.cookie("token", token,{
            httpOnly : true,
            secure : true,
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            message : "User login success",
            user
        })
    } catch (error) {
        return res.status(404).json({message : "Internal server error"})
    }
}

export const getUer = async(req ,res) => {
    const {userId} = req 
    try {
        const user = await userModel.findById(userId)
        res.json({user})
    } catch (error) {
        res.json({error})
    }
}

export const incCredits = async(req , res) => {
    const {userId} = req;
    const {amount} = req.body;
    try {
        const user = await userModel.findById(userId);
        user.credits += Number(amount);
        await user.save();
        res.json({user});
    } catch (error) {
        res.json({error})
    }
}

export const logout = async(req , res) => {
    await res.clearCookie("token")
    return res.status(200).json({message : "Logout Success"})
}