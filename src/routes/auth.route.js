const express = require("express");
const route = express.Router();

const { 
    handleRegister, 
    handleLogin,
    handleGetUsers,
    handleUpdateProfile,
    handleChangePassword
} = require("../controllers/auth.controller");

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);

route.put("/password", handleChangePassword)
route.put("/user/updateprofile/:id", handleUpdateProfile);

route.get("/users", handleGetUsers);

module.exports = route;