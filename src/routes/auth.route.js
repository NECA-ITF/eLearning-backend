const express = require("express");
const route = express.Router();

const { 
    handleRegister, 
    handleLogin,
    handleGetUsers
} = require("../controllers/auth.controller");
const { handlePassword } = require('../model/Password')

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);
route.put("/password", handlePassword)

route.get("/users", handleGetUsers);

module.exports = route;