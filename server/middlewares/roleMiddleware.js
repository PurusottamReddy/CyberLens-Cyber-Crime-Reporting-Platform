export const checkRole=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(401).json({success:false,message:"Access denied"})
        }
        next();
    }
}