import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// Register User : /api/user/register
export const registerUser = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        if(!name || !email || !password ){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })}
        // if(password.length<8){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Password must be at least 8 characters long"
        //     })
        // }
        // if(!/[A-Z]/.test(password)){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Password must contain at least one uppercase letter"
        //     })
        // }
        // if(!/[a-z]/.test(password)){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Password must contain at least one lowercase letter"
        //     })
        // }
        // if(!/[0-9]/.test(password)){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Password must contain at least one number"
        //     })
        // }
        // if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Password must contain at least one special character"
        //     })
        // }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })}

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,email,password:hashedPassword,role:"user"
        })

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge:1000 * 60 * 60 * 24
        })
        return res.json({success: true, user: {email: user.email, name: user.name,role:user.role}})
    }catch(error){
            res.json({success:false,message:error.message})

    }
}


// Login User : /api/user/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: { email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



// Check Auth : /api/user/is-auth
export const isAuth = async (req, res)=>{
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({success: true, user})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//Logout user; /api/user/logout
export const logoutUser = async (req, res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success:true,message:"User logged out"})
    }catch(error){
        console.error("Logout Error:", error);
        res.json({success:false,message:error.message})
    }
}