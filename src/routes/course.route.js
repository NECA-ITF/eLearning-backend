const express = require("express");
const route = express.Router();

const { 
    handleNewCourse, 
    handleNewOutline, 
    handleNewVideos, 
    handleGetCourses, 
    handleGetOutlines, 
    handleGetVideos, 
    handleDeleteSingleOutline, 
    handleDeleteSingleVideo, 
    handleDeleteAllVideos, 
} = require("../controllers/course.controller");

route.post("/course", handleNewCourse)
route.post("/outlines", handleNewOutline)
route.post("/videos", handleNewVideos)


route.get("/courses", handleGetCourses)
route.get("/outlines/:courseId", handleGetOutlines)
route.get("/videos/:courseId/:outlineId", handleGetVideos)


route.delete("/outline", handleDeleteSingleOutline)

route.delete("/video", handleDeleteSingleVideo)
route.delete("/videos", handleDeleteAllVideos)

module.exports = route;