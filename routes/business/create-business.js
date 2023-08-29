const express = require("express");
const mongoose = require("mongoose");
const Business = mongoose.model("businesses");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys");
const currentUser = require("../../middlewares/currentUser");

const router = express.Router();

router.post("/api/business", async (req, res) => {
  const { name } = req.body;

  if (!req.currentUser) return res.status(401).send({ message: "Not Authenticated!" });
  if (req.currentUser.role !== "CEO") return res.status(403).send({ message: "Not Authorized!" });

  const createdBusinessDoc = await Business.create({ ownerId: req.currentUser.id, name, parts: [] });

  res.send(createdBusinessDoc);
});

module.exports = router;
