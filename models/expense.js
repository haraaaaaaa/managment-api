const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  businessId: { type: String, require: true, index: true },
  employeeId: { type: String, require: true, index: true },
  part: { type: String, require: true },
  title: { type: String, require: true },
  date: { type: Date, require: true },
});

mongoose.model("expenses", expenseSchema);
