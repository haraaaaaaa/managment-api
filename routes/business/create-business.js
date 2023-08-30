const express = require("express");
const mongoose = require("mongoose");
const Business = mongoose.model("businesses");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys");

// Required Middlewares
const currentUser = require("../../middlewares/currentUser");
const checkAuth = require("../../middlewares/checkAuth");
const checkCEO = require("../../middlewares/checkCEO");

const router = express.Router();

router.post("/api/business", checkAuth, checkCEO, async (req, res) => {
  const { name } = req.body;

  const createdBusinessDoc = await Business.create({ ownerId: req.currentUser.id, name, parts: {} });

  res.send(createdBusinessDoc);
});

module.exports = router;
