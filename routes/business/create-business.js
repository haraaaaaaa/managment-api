const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/api/business", async (req, res) => {
  const { name } = req.body;

  res.send();
});

module.exports = router;
