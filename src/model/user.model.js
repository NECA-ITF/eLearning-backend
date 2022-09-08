const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        requried: true,
    },
    isAdmin: {
        type: Boolean,
        requried: true
    }
})


module.exports = model("User", userSchema);