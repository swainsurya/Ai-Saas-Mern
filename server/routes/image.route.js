import { Router } from "express";
import { userVerify } from "../middlewares/userVerify.js";
import { generate } from "../controllers/image.js";

const imageRouter = Router() ;

// imageRouter.get("/",userVerify);
imageRouter.post("/generate",userVerify,generate)

export default imageRouter ;