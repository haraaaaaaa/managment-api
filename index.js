// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./keys/keys");

// Server Config
const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(cors());

// Required Models
require("./models/business");
require("./models/user");

// Required Auth Routes
const signInRouter = require("./routes/auth/signin");
const signUpRouter = require("./routes/auth/signup");

// Required Business Routes
const createBusinessRouter = require("./routes/business/create-business");
const showBusinessDetailRouter = require("./routes/business/show-business");
const showBusinessesRouter = require("./routes/business/show-businesses");
const createPartRouter = require("./routes/business/create-part");

// Auth Router Middlewares
app.use(signInRouter);
app.use(signUpRouter);

// Business Router Middlewares
app.use(createBusinessRouter);
app.use(showBusinessDetailRouter);
app.use(showBusinessesRouter);
app.use(createPartRouter);

const start = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

start();
