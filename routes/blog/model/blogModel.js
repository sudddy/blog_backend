const mongoose = require("mongoose");

var { Schema } = mongoose;

var blogDetails = new Schema({
  userId: String,
  blogName: String,
  blogDescription: String,
  blogContent: String,
  comments: Array
});

module.exports = mongoose.model("BlogDetails", blogDetails, "Blogs");
