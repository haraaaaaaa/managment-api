const express = require("express");
const mongoose = require("mongoose");
const Business = mongoose.model("businesses");
const Expense = mongoose.model("expenses");

// Required Middlewares
const checkAuth = require("../../middlewares/checkAuth");
const checkEmployee = require("../../middlewares/checkEmployee");

const router = express.Router();

router.get("/api/business/:id/expenses", checkAuth, checkEmployee, async (req, res) => {
  const { partName } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ message: "Id not valid!" });
  if (!partName) return res.status(400).send({ message: "Bad Request!" });

  const businessDoc = await Business.findById(req.params.id);
  if (!businessDoc) return res.status(404).send({ message: "Business Doesn't Exist!" });

  const employeeId = await businessDoc.parts.get(partName);
  if (!employeeId) return res.status(404).send({ message: "Part Doesn't Exist!" });

  if (employeeId !== req.currentUser.id) return res.status(403).send({ message: "Not Authorized" });

  const expensesDoc = await Expense.find({ employeeId: req.currentUser.id });

  res.status(201).send(expensesDoc);
});

module.exports = router;
