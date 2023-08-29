const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  parts: [String],
});

mongoose.model("businesses", businessSchema);
