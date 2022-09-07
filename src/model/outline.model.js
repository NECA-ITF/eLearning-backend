const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const outlineSchema = new Schema({
    courseId: {
       type: String,
        required: true,
        unique: true
    },
    outlines: [
        {  
            title: {
                type: String,
                required: true,
                unique: true                
            } 
        }
    ]
});


  
  module.exports = model('Outline', outlineSchema);





  
//   outlines: {
//     type: [Object],
//     required:true,
//     title: {
//         type: String,
//         required: true,
//         unique: true                
//     }

// }