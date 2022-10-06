const express = require("express");

const route = express.Router();
const { 
    handleAddMessage,
    handleGetMessages,
    handleMarkAsResolved
    } = require("../controllers/message.controller");

route.post("/message/new", handleAddMessage);

route.get("/messages", handleGetMessages);

route.put("/message/resolve", handleMarkAsResolved);

module.exports = route;