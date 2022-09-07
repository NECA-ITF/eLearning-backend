const express = require("express");
const route = express.Router();


// const handleGetVideos = require("../controllers/getCourse.controller")


const { handleNewCourse, handleNewOutline, handleNewVideo, handeleGetCourses, handeleGetOutlines, handleGetVideos  } = require("../controllers/course.controller");

route.get("/courses", handeleGetCourses)
route.get("/outlines/:id", handeleGetOutlines)


route.post("/newCourse", handleNewCourse)
route.post("/newOutline/:id", handleNewOutline)
route.post("/newVideo/:id", handleNewVideo)
route.get("/getVideo/:id", handleGetVideos)

module.exports = route;