const express = require("express");
const route = express.Router();

const { 
    handleRegister, 
    handleLogin,
    handleGetUsers,
    handleUpdateProfile,
    handleForgottenPassword,
    handleChangePassword,
    handleDeleteUser

} = require("../controllers/auth.controller");

route.post("/user/register", handleRegister);
route.post("/user/login", handleLogin);

route.put("/user/updateprofile/:id", handleUpdateProfile);
route.put("/forgottenpassword", handleForgottenPassword)
route.put("/changepassword", handleChangePassword)
route.get("/users", handleGetUsers);
route.delete("/user", handleDeleteUser);

module.exports = route;

