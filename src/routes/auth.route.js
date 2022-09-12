const express = require("express");
const route = express.Router();

const { 
    handleRegister, 
    handleLogin,
    handleUpdateProfile
} = require("../controllers/auth.controller");
const { handlePassword } = require('../model/Password')

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);
route.put("/password", handlePassword)
route.put("/user/updateprofile/:id", handleUpdateProfile);

module.exports = route;