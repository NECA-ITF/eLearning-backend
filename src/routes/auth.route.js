const express = require("express");
const route = express.Router();

const { 
    handleRegister, 
    handleLogin,
    handleGetUsers,
    handleUpdateProfile,
    handleForgottenPassword
} = require("../controllers/auth.controller");

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);

route.put("/user/updateprofile/:id", handleUpdateProfile);
route.put("/forgottenpassword", handleForgottenPassword)

route.get("/users", handleGetUsers);

module.exports = route;