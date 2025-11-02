import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const isAuth = async(req,res,next)=>{
    try{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"user is not authenticated"
        })
    }
    const decode= jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("-password");
    if(!user) return res.status(401).json({success:false,message:"user not found"});
        req.user=user;
    next();

}catch(err){
    return res.status(401).json({success:false,message:"token is not valid"})
}
}