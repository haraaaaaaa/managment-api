const express = require("express");
const mongoose = require("mongoose");
const Business = mongoose.model("businesses");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys");

const router = express.Router();

router.get("/api/business/:id", async (req, res) => {
  res.send();
});

module.exports = router;
