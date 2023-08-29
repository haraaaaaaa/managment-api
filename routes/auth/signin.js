const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys.js");

const router = express.Router();

router.post("/api/users/signin", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) return res.status(401).send({ message: "Auth Failed" });

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) return res.status(401).send({ message: "Auth Failed" });

  res.status(201).send({
    message: "Auth Successful",
    token: jwt.sign({ id: existingUser._id, role: existingUser.role }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    }),
  });
});

module.exports = router;
