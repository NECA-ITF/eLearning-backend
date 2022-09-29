const express = require("express");
const route = express.Router();
const multer = require('multer');
const imgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
});
const uploadImg = multer({ storage: imgStorage })

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/videos/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
});
const uploadVideo = multer({ storage: videoStorage })


const { 
    handleNewCourse, 
    handleNewOutline, 
    handleNewVideos, 
    handleGetCourses, 
    handleGetOutlines, 
    handleGetVideos,
    handleAllGetVideos, 
    handleDeleteCourse,
    handleDeleteOutline, 
    handleDeleteVideo,
    handleUpdateOutline,
    handleUpdateVideos,
    handleUpdateCourseHistory,
    handleGetCourseHistory
} = require("../controllers/course.controller");

route.post("/course", uploadImg.single('file'), handleNewCourse)
route.post("/outlines", handleNewOutline)
route.post("/videos", uploadVideo.single('file'), handleNewVideos)
route.post("/history/course", handleUpdateCourseHistory)

route.get("/courses", handleGetCourses)
route.get("/outlines/:courseId", handleGetOutlines)
route.get("/videos/:outlineId", handleGetVideos)
route.get("/allvideos/:courseId", handleAllGetVideos)
route.get("/history/:userId/:courseId", handleGetCourseHistory)

route.delete("/course", handleDeleteCourse)
route.delete("/outline", handleDeleteOutline)
route.delete("/video", handleDeleteVideo)

route.put("/outline", handleUpdateOutline)
route.put("/video", handleUpdateVideos)

module.exports = route;