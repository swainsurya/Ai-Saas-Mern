import jwt from "jsonwebtoken"

export const userVerify = async(req , res , next) => {
    const {token} = req.cookies ;
    if(!token) {
        return res.json({
            message : "Unauthorized User"
        })
    }
    const {userId} = await jwt.decode(token,process.env.JWT_KEY);
    req.userId = userId ;
    next()
}