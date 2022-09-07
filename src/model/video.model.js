const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoSchema = new Schema({
    courseId: {
      type: String,
      required: true 
    },
    outlineId: {
      type: String,
      required: true 
    }, 
    videos: [
      {
        title: {
          type: String,
          required: true,
          unique: true 
        },
        url: {
          type: String,
          required: true 
        }
      }
    ] 
  });
  
  
  module.exports = model('video', videoSchema);