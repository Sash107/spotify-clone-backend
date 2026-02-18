const express=require("express");
const musicController=require("../controllers/music.controller")
const multer=require("multer");
const authArtist=require("../middleware/auth.middleware");


const storage=multer.memoryStorage();
const upload=multer({storage:storage});

const router=express.Router();

router.post("/create_music",authArtist,upload.single("music"),musicController.createMusic);

router.post("/create_album",authArtist,musicController.createAlbum);

module.exports=router;