const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PasswordSchema = new Schema({
    userId: {
        type: String,
        unique: true
    },

    email: {
        type: String,
        unique: true
    },

    newPassword: {
        type: String
    }
})

module.exports = model('password', PasswordSchema)