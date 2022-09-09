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
    handleDeleteVideo
} = require("../controllers/course.controller");

route.post("/course", handleNewCourse)
route.post("/outlines", handleNewOutline)
route.post("/videos", handleNewVideos)


route.get("/courses", handleGetCourses)
route.get("/outlines/:courseId", handleGetOutlines)
route.get("/videos/:courseId/:outlineId", handleGetVideos)


route.delete("/course", handleDeleteCourse)
route.delete("/outline", handleDeleteOutline)
route.delete("/video", handleDeleteVideo)

module.exports = route;