const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoSchema = new Schema({
    courseId: {
      type: String,
      required: true 
    },
    outlinesId: {
      type: String,
      required: true 
    }, 
    videos: [
          {
            outlineId: {
              type: String,
              required: true 
            } ,   
            url: {
              type: String,
              required: true,
              unique: true 
            }
          }
    ] 
  });
  
  
  module.exports = model('video', videoSchema);