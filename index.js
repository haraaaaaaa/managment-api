// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./keys/keys");

// Server Config & Middleware Config
const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(cors());

// Required Models
require("./models/business");
require("./models/user");
require("./models/expense");

// Required Auth Routes
const signInRouter = require("./routes/auth/signin");
const signUpRouter = require("./routes/auth/signup");
const ceoSignUpRouter = require("./routes/auth/ceo-signup");
const employeeSignUpRouter = require("./routes/auth/employee-signup");

// Required Business Routes
const createBusinessRouter = require("./routes/business/create-business");
const showBusinessDetailRouter = require("./routes/business/show-business");
const showBusinessesRouter = require("./routes/business/show-businesses");
const createPartRouter = require("./routes/business/create-part");
const createExpenseRouter = require("./routes/business/create-expense");
const showExpenseRouter = require("./routes/business/show-expenses");

// Auth Router Middlewares
app.use(signInRouter);
app.use(signUpRouter);
app.use(ceoSignUpRouter);
app.use(employeeSignUpRouter);

// Business Router Middlewares
app.use(createBusinessRouter);
app.use(showBusinessDetailRouter);
app.use(showBusinessesRouter);
app.use(createPartRouter);
app.use(createExpenseRouter);
app.use(showExpenseRouter);

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
