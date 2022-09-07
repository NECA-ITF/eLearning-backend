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
    videos: {
      type: [
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
      ],
      required: true
    }
  });
  
  
  module.exports = model('video', videoSchema);
  // videos: [
  //   {
  //     title: {
  //       type: String,
  //       required: true,
  //       unique: true 
  //     },
  //     url: {
  //       type: String,
  //       required: true 
  //     }
  //   }
  // ] 