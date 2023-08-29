const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/api/users/signin", async (req, res) => {
  const { username, password } = req.body;

  res.send();
});

module.exports = router;
