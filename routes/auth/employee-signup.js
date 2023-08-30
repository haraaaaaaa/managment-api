const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { hash } = require("bcrypt");

// Required Middlewares
const checkAuth = require("../../middlewares/checkAuth");
const checkCEO = require("../../middlewares/checkCEO");

const router = express.Router();

router.post("/api/users/employee-signup", checkAuth, checkCEO, async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).send({ message: "Provided E-mail is already in use" });

  const hashedPassword = await hash(password, 10);

  const createdUserDoc = await User.create({
    email,
    password: hashedPassword,
    role: "EMPLOYEE",
    ownerId: req.currentUser.id,
  });

  res.status(201).send(createdUserDoc);
});

module.exports = router;
