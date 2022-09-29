const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const historySchema = new Schema({
    userId: String,
    courseId: String,
    watchedVideos: [String]
});

module.exports = model("History", historySchema);