const mongoose = require("mongoose");

function connectDB() {
  const url =
    "mongodb+srv://skillsme:skillsme@cluster0.2ayhq.mongodb.net/Skillsme?retryWrites=true&w=majority";

  mongoose.connect(url, {
    useNewUrlParser: true
  });
  console.log("Mongo Running.." + url);
}

module.exports = connectDB;
