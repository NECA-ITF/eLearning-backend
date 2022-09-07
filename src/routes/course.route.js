const express = require("express");
const route = express.Router();
const { handleNewCourse, handleNewOutline, handleNewVideo,handleGetVideos } = require("../controllers/course.controller");

// const handleGetVideos = require("../controllers/getCourse.controller")

route.post("/newCourse", handleNewCourse)
route.post("/newOutline", handleNewOutline)
route.post("/newVideo", handleNewVideo)
route.get("/getVideo/:id", handleGetVideos)

module.exports = route;