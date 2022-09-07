const express = require("express");
const route = express.Router();
const { handleNewCourse, handleNewOutline, handleNewVideo, handeleGetCourses, handeleGetOutlines } = require("../controllers/course.controller");

route.get("/courses", handeleGetCourses)
route.get("/outlines", handeleGetOutlines)

route.post("/newCourse", handleNewCourse)
route.post("/newOutline", handleNewOutline)
route.post("/newVideo", handleNewVideo)

module.exports = route;