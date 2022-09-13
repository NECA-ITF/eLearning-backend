const express = require("express");
const route = express.Router();

const { 
    handleRegister, 
    handleLogin,
    handleGetUsers,
    handleUpdateProfile,
    handleForgottenPassword,
    handleChangePassword
} = require("../controllers/auth.controller");
const { handlePassword } = require('../model/Password')

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);
route.put("/password", handlePassword)
route.put("/user/updateprofile/:id", handleUpdateProfile);
route.put("/user/forgotpassword", handleForgottenPassword)
route.put("/user/changepassword", handleChangePassword)

route.get("/users", handleGetUsers);

module.exports = route;