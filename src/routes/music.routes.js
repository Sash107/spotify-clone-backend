const express=require("express");
const musicController=require("../controllers/music.controller")
const multer=require("multer");
const authMiddleWare=require("../middleware/auth.middleware");


const storage=multer.memoryStorage();
const upload=multer({storage:storage});

const router=express.Router();

router.post("/create_music",authMiddleWare.authArtist,upload.single("music"),musicController.createMusic);

router.post("/create_album",authMiddleWare.authArtist,musicController.createAlbum);

router.get("/",authMiddleWare.authUsers,musicController.getAllMusics);

router.get("/albums",authMiddleWare.authUsers,musicController.getAllAlbums);

router.get("/albums/:albumId",authMiddleWare.authUsers,musicController.getAlbumById);

module.exports=router;