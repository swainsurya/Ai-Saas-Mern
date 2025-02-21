import { Router } from "express";
import { getUer, incCredits, login, logout, register } from "../controllers/user.js";
import { userVerify } from "../middlewares/userVerify.js";

const userRouters = Router() ;

userRouters.post("/login",login)
userRouters.post("/register",register)
userRouters.post("/logout", logout)
userRouters.get("/",userVerify,getUer)

userRouters.post("/plusCredit",userVerify,incCredits);

export default userRouters ;