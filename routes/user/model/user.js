const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  img: Object
});

module.exports = mongoose.model("Users", UsersSchema, "Users");
