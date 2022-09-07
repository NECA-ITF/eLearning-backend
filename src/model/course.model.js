const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courseSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true
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
      type: String
    },
    rating: String
  }, { timestamps: true });
  

  
  
  
  module.exports = model('Course', courseSchema);