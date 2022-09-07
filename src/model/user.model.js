const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RegisterSchema = new Schema({
    fullName: {
        type: String,
        requried: true
    },

    userName: {
        type: String,
        requried: true,
        unique: true
    },

    gender: {
        type: String,
        requried: true
    },

    // dob: {
    //     type: String,
    //     requried: true
    // },
    
    phone: {
        type: String,
        requried: true,
        unique: true
    },

    email: {
        type: String,
        requried: true,
        unique: true
    },

    password: {
        type: String,
        requried: true,
        unique: true
    }
})

const LoginSchema = new Schema({
    userName: {
        type: String,
        requried: true,
        unique: true
    },

    email: {
        type: String,
        requried: false,
        unique: true
    },

    password: {
        type: String,
        requried: true,
        unique: true
    }
})

module.exports = ({ RegisterSchema, LoginSchema })