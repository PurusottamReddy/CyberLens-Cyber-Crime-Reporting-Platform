import mongoose from "mongoose";

const CrimeSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:null
    },

    anonymous:{
        type:Boolean,      
        default:false,
        required:true
    },

    category:{
        type:String,
        enum:["Financial Fraud","Phishing","Online Harassment","Deepfake","Hacking","Cyberstalking","CSAM","Intellectual Property Theft","Cyberterrorism","Other"],
        default:"Other",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    related_info:{
        type:String,
        required:true
    },
    evidence:{
        type:[String],
        default:[]
    },
    status:{
        type:String,
        enum:["Pending","Investigating","Resolved"],
        default:"Pending",
        required:true
    },

    

}, {timestamps:true})

const Crime = mongoose.models.crime || mongoose.model("report",CrimeSchema)

export default Crime;
