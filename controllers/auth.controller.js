const Bcrypt = require("bcryptjs");
const userSchema = require("../models/users.model");
const LoginSchema = require("../models/Login.model");
const jwt = require("jsonwebtoken");
const {
  RFC,
  LOGIN_SUCCESS,
  INVALID_USER,
} = require("../frozen/msgAndStatusCode");

exports.Login = async (req, res) => {
  const where = { email: req.body.email };
  const user = await userSchema.find(where);
  const data = {};
  jwt.sign({ user }, "secretkey", { expiresIn: "2h" }, (err, token) => {
    data.user = user;
    data.token = token;
  });
  if (user.length === 0) {
    res.status(RFC.H401).json({ msg: INVALID_USER });
  } else {
    const cmp = await Bcrypt.compare(req.body.password, user[0].password);
    if (cmp) {
      var today = new Date();
      var time = today.toISOString("en-IN");
      await LoginSchema.create({
        email: data.user[0].email,
        role: data.user[0].role,
        login_time: time,
      });
      res.status(RFC.H200).json({ data: data, msg: LOGIN_SUCCESS });
    } else {
      res.status(RFC.H401).json({ msg: INVALID_USER });
    }
  }
};
