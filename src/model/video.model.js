const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoSchema = new Schema({
    courseId: {
      type: String,
      required: true
    },
    outlineTitle: {
      type: String,
      required: true
    },
    outlineId: {
      type: String,
      required: true,
      unique: true 
    }, 
    videos: [
      {
        title: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true 
        }
      }
    ]
  });
  
  
  module.exports = model('Video', videoSchema);