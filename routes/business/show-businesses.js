const express = require("express");
const mongoose = require("mongoose");
const Business = mongoose.model("businesses");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys");

// Required Middlewares
const checkAuth = require("../../middlewares/checkAuth");

const router = express.Router();

router.get("/api/business", checkAuth, async (req, res) => {
  const businessesDoc = await Business.find({ ownerId: req.currentUser.id });

  res.status(201).send(businessesDoc);
});

module.exports = router;
