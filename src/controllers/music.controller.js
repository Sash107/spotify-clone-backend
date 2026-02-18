const musicModel=require("../models/music.model");
const jwt=require("jsonwebtoken");
const {uploadFile}=require("../services/storage.services");

async function createMusic(req,res){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized no token"
        })
    }
    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(decoded.role!='artist'){
            return res.status(403).json({
                message:"You do not have access to create music"
            })
        }

        const {title}=req.body;
        const file=req.file;

        const result=await uploadFile(file.buffer.toString("base64"));

        musicModel.create({
            uri:result.url,
            title:title,
            artist:decoded.id
        })

        res.status(201).json({
            message:"Music uploaded successfully"
        })
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}

module.exports={createMusic};