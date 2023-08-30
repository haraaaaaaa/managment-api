const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  parts: { type: Map, of: String },
});

mongoose.model("businesses", businessSchema);
