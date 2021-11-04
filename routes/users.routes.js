const express = require("express");
const app = express();
// const morgan = require('morgan');
const {
  findAll,
  createOne,
  findOne,
  updateOne,
  deleteOne,
  deleteAll,
} = require("../controllers/users.controller");
const { Login } = require("../controllers/auth.controller");
const auth = require("../helpers/jwt.helper");
// Express route
const userRouter = express.Router();

// Get users
userRouter.get("/user-recoard", auth, findAll);
// Get single user
userRouter.get("/user-recoard/:id", auth, findOne);
// Update user
userRouter.get("/update-user/:id", auth, updateOne);
// Create user
userRouter.post("/create-user", createOne);
// Delete ONe user
userRouter.post("/remove-user/:id", auth, deleteOne);
// Delete All user
userRouter.post("/remove-user", auth, deleteAll);
//Login request
userRouter.post("/login", Login);

module.exports = userRouter;