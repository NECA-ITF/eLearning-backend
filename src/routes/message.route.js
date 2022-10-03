const express = require("express");

const route = express.Router();
const { 
    handleAddMessage,
    handleGetMessages
    } = require("../controllers/message.controller");

route.post("/message/new", handleAddMessage);

route.get("/messages", handleGetMessages);

module.exports = route;