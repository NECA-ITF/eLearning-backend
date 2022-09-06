const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoSchema = new Schema({
    courseId: {
      type: String
    },
    outlineId: {
      type: String 
    },

    videos: [
          {outlineId: {
             type: String,
             url: {type: String,
                   required: true
            }
          }          
          }
    ] 
  });
  
  
  module.exports = model('video', videoSchema);