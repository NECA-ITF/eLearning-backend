const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courseSchema = new Schema({
    title: {
      type: String,
      required: true
    },

    instructor: {
        type: String,
        required: true
      },

    description: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String,
      required: true
    },
    totalHours: {
      type: Number,
      default: 0
    },
    rating: {
      type: String
    }
  }, { timestamps: true });
  
  
  module.exports = model('Course', courseSchema);