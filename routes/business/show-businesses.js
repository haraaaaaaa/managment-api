const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/api/business", async (req, res) => {
  res.send();
});

module.exports = router;
