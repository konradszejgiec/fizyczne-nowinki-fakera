const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "Please fill the author name."],
    bufferCommands: false,
    autoCreate: false,
  },
  content: {
    type: String,
    required: [true, "Please fill the content."],
    unique: true,
    bufferCommands: false,
    autoCreate: false,
  },
  date: {
    type: Date,
    required: [true, "Please fill the date field."],
    bufferCommands: false,
    autoCreate: false,
  },
  description: {
    type: String,
    required: [true, "Please fill the content."],
    bufferCommands: false,
    autoCreate: false,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
