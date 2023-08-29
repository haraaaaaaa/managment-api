const express = require("express");
const mongoose = require("mongoose");
const Business = mongoose.model("businesses");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys");

const router = express.Router();

router.get("/api/business", async (req, res) => {
  const { token } = req.body;

  const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

  if (decodedToken.role !== "CEO") return res.status(403).send({ message: "Not Authorized!" });

  const createdBusinessDoc = await Business.create({ name, parts: [], ownerId: decodedToken.id });

  res.send(createdBusinessDoc);
});

module.exports = router;
