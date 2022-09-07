const express = require("express");
const route = express.Router();
const { handleNewCourse, handleNewOutline, handleNewVideo } = require("../controllers/course.controller");

route.post("/newCourse", handleNewCourse)
route.post("/newOutline", handleNewOutline)
route.post("/newVideo", handleNewVideo)

module.exports = route;