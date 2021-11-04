const Freeze = require("../frozen/frozenObjects");
const Bcrypt = require("bcryptjs");
const userSchema = require("../models/users.model");
const {RFC, CREATED, UPDATED, DATA_FOUND, DELETE_DATA, ALREADY} = require('../frozen/msgAndStatusCode');
exports.findAll = (req, res) => {
  const where = { role: Freeze.USER };
  userSchema.find(where, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(RFC.H302).json({data: data, msg: DATA_FOUND});
    }
  });
};

exports.createOne = async (req, res, next) => {
  const where = { email: req.body.email };
  const Hash = await Bcrypt.hash(req.body.password, (saltRounds = 10));
  userSchema.find(where, (error, data) => {
    if (data.length === 0) {
      userSchema.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: Hash,
          role: req.body.role,
        },
        (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.status(RFC.H201).json({ msg: CREATED });
          }
        }
      );
    } else {
      res.status(RFC.H302).json({
        data: data,
        msg: ALREADY,
      });
    }
  });
};

exports.findOne = (req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(RFC.H302).json(data);
    }
  });
};

exports.updateOne = (req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json({msg: UPDATED});
      }
    }
  );
};

exports.deleteOne = (req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(RFC.H204).json({
        msg: DELETE_DATA,
      });
    }
  });
};

exports.deleteAll = (req, res, next) => {
  userSchema.deleteMany((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(RFC.H200).json({
        msg: DELETE_DATA,
      });
    }
  });
};