const express = require("express");
const route = express.Router();
const { 
    handleRegister, 
    handleLogin, 
    handleGetUser 
} = require("../controllers/auth.controller");

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);

route.get("/user/:userId", handleGetUser);

module.exports = route;