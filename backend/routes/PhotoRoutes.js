const express = require("express");
const router = express.Router();

//Controller
const {insertPhoto, deletePhoto, getPhotos, getPhotosByUser, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhoto} = require("../controllers/PhotoController");

//Middlewares
const {photoValidation, photoTitleValidation} = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const imageUpload = require("../middlewares/imageUpload");

//Routes
router.post("/user/:id", imageUpload.single("image"), authGuard, photoValidation(), validate, insertPhoto );
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard ,getPhotos);
router.get("/user/:id", authGuard, getPhotosByUser);
router.get("/search", authGuard, searchPhoto);
router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard,photoTitleValidation(),validate, updatePhoto);
router.put("/likes/:id", authGuard, likePhoto);
router.put("/comments/:id", authGuard, commentPhoto);

module.exports = router;