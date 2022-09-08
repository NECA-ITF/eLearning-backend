const express = require("express");
const route = express.Router();


// const handleGetVideos = require("../controllers/getCourse.controller")


const { 
    handleNewCourse, 
    handleNewOutline, 
    handleNewVideo, 
    handleGetCourses, 
    handleGetOutlines, 
    handleGetVideos, 
    handleDeleteSingleOutline, 
    handleDeleteSingleVideo, 
    handleDeleteOutlineVideos, 
    handleDeleteCourseVideos 
} = require("../controllers/course.controller");

route.post("/course", handleNewCourse)
route.post("/outlines", handleNewOutline)
route.post("/videos", handleNewVideo)


route.get("/courses", handleGetCourses)
route.get("/outlines/:courseId", handleGetOutlines)
route.get("/videos/:courseId/:outlineId", handleGetVideos)


route.delete("/deleteOutline", handleDeleteSingleOutline)

route.delete("/videos", handleDeleteSingleVideo)
route.delete("/videos/:outlineId", handleDeleteOutlineVideos)
route.delete("/videos/:courseId", handleDeleteCourseVideos)

module.exports = route;