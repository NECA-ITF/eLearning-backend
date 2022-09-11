const express = require("express");
const route = express.Router();
const { 
    handleRegister, 
    handleLogin
} = require("../controllers/auth.controller");

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);
route.put("/user/updateprofile/:id", handleUpdateProfile);

module.exports = route;