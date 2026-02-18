const jwt=require("jsonwebtoken");

async function authArtist(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(403).json({
            message:"Unauthorized"
        })
    }

    try{
        const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(decoded.role!="artist"){
            return res.status(403).json({
            message:"Unauthorized"
        })
        }
        
        req.artistId=decoded.id;

        next();

    }catch(err){
        return res.status(403).json({
            message:"Unauthorized",
        })
    }

}

async function authUsers(req,res,next){

    const token=req.cookies.token;

    if(!token){
        return res.status(403).json({
            message:"Unauthorized"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(decoded.role!="user"){
            return res.status(403).json({
            message:"Unauthorized"
        })
        }

        req.user=decoded;

        next();

    }catch(err){
        return res.status(403).json({
            message:"Unauthorized"
        })
    }
}

module.exports={authArtist,authUsers};