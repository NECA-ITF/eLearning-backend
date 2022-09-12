const express = require("express");
const route = express.Router();

const { 
    handleNewCourse, 
    handleNewOutline, 
    handleNewVideos, 
    handleGetCourses, 
    handleGetOutlines, 
    handleGetVideos, 
    handleDeleteCourse,
    handleDeleteOutline, 
    handleDeleteVideo,
    handleUpdateOutline,
    handleUpdateVideos
} = require("../controllers/course.controller");

route.post("/course", handleNewCourse)
route.post("/outlines", handleNewOutline)
route.post("/videos", handleNewVideos)

route.get("/courses", handleGetCourses)
route.get("/outlines/:courseId", handleGetOutlines)
route.get("/videos/:outlineId", handleGetVideos)

route.delete("/course", handleDeleteCourse)
route.delete("/outline", handleDeleteOutline)
route.delete("/video", handleDeleteVideo)

route.put("/outline", handleUpdateOutline)
route.put("/video", handleUpdateVideos)

module.exports = route;