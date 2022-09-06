const express = require("express");
const route = express.Router();
const { handleNewCourse } = require("../controllers/course.controller");

route.post("/newCourse", handleNewCourse)

module.exports = route;