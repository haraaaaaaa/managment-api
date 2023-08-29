const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/api/business/:id/parts", async (req, res) => {
  res.send();
});

module.exports = router;
