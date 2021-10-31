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
} = require("../controllers/student.controller");
const { Login } = require("../controllers/auth.controller");
const auth = require("../helpers/jwt.helper");
// Express route
const studentRouter = express.Router();

// Get users
studentRouter.get("/student-recoard", auth, findAll);
// Get single user
studentRouter.get("/student-recoard/:id", auth, findOne);
// Update user
studentRouter.get("/update-student/:id", auth, updateOne);
// Create user
studentRouter.post("/create-student", createOne);
// Delete ONe student
studentRouter.post("/remove-student/:id", auth, deleteOne);
// Delete All student
studentRouter.post("/remove-student", auth, deleteAll);
//Login request
studentRouter.post("/login", Login);

module.exports = studentRouter;