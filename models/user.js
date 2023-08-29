const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

mongoose.model("users", userSchema);