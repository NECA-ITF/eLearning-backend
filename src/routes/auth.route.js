const express = require("express");
const route = express.Router();

const { 
    handleRegister, 
    handleLogin,
    handleGetUsers,
    handleUpdateProfile,
    handleForgottenPassword
} = require("../controllers/auth.controller");
const { handlePassword } = require('../model/Password')

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);
route.put("/password", handlePassword)
route.put("/user/updateprofile/:id", handleUpdateProfile);


route.get("/users", handleGetUsers);

module.exports = route;