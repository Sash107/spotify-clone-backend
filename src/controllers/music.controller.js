const musicModel=require("../models/music.model");
const albumModel=require("../models/album.model");
const jwt=require("jsonwebtoken");
const {uploadFile}=require("../services/storage.services");

async function createMusic(req,res){

    const {title}=req.body;
    const artistId=req.artistId;
    const file=req.file;

    const result=await uploadFile(file.buffer.toString("base64"));

    await musicModel.create({
        uri:result.url,
        title:title,
        artist:artistId
    })

    res.status(201).json({
        message:"Music uploaded successfully"
    })
}

async function createAlbum(req,res){

    const {title,musicIds}=req.body;
    const artistId=req.artistId;
    const album=await albumModel.create({
        title:title,
        musics:musicIds,
        artist:artistId
    })

    return res.status(201).json({
        message:"Album Created Successfully",
        album
    })

}

module.exports={createMusic,createAlbum};