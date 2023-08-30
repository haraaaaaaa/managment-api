const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Business = mongoose.model("businesses");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys");

// Required Middlewares
const checkAuth = require("../../middlewares/checkAuth");
const checkCEO = require("../../middlewares/checkCEO");

const router = express.Router();

router.post("/api/business/:id/parts", checkAuth, checkCEO, async (req, res) => {
  const { partName, employeeId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ message: "Id not valid!" });
  if (!partName || !employeeId) return res.status(400).send({ message: "Bad Request!" });

  const employee = await User.findById(employeeId);
  if (!employee) return res.status(404).send({ message: "Employee Doesn't Exist!" });

  const bussinessDoc = await Business.findById(req.params.id);

  const partCheck = bussinessDoc.parts.get(partName);
  if (partCheck) return res.status(400).send({ message: "Created Part Already Exists!" });

  bussinessDoc.parts.set(part, employeeId);
  const modifiedBusinessDoc = await bussinessDoc.save();

  res.status(201).send(modifiedBusinessDoc);
});

module.exports = router;
