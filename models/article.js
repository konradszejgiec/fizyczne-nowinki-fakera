const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please fill the title."],
    unique: true,
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
  source: {
    type: String,
    required: [true, "Please fill the source link."],
    unique: true,
    bufferCommands: false,
    autoCreate: false,
  },
  author: {
    type: String,
    required: [true, "Please fill the author name."],
    bufferCommands: false,
    autoCreate: false,
  },
  date: {
    type: Date,
    required: [true, "Please fill the date field."],
    bufferCommands: false,
    autoCreate: false,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
