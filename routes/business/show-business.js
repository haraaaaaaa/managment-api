const express = require("express");
const mongoose = require("mongoose");
const Business = mongoose.model("businesses");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys");

const router = express.Router();

router.get("/api/business/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ message: "Id not valid!" });

  const businessDoc = await Business.findById(req.params.id);

  res.status(201).send(businessDoc);
});

module.exports = router;
