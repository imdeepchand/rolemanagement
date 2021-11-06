const { config } = require("../config/config");
const imageSchema = require("../models/image.model");
const { ObjectId } = require("mongodb");
const {
  RFC,
  CREATED,
  UPDATED,
  DATA_FOUND,
  DELETE_DATA,
} = require("../frozen/msgAndStatusCode");
exports.store = (req, res, next) => {
  imageSchema.create(
    {
      image: `${config.ImagePath}/public/image/${req.file.filename}`,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(RFC.H201).json({ msg: CREATED });
      }
    }
  );
};

exports.getImage = (req, res, next) => {
  imageSchema.find((error, data) => {
    if (error) console.log(error);
    else {
      res.status(RFC.H302).json({
        data: data,
        msg: DATA_FOUND,
      });
    }
  });
};

exports.updateById = (req, res) => {
  const where = { _id: new ObjectId(req.params.id) };
  imageSchema.findByIdAndUpdate(
    where,
    {
      $set: {
        image: `${config.ImagePath}/public/image/${req.file.filename}`,
      },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(RFC.H301).json({ data: data, msg: UPDATED });
      }
    }
  );
};

exports.deleteById = (req, res) => {
  const where = { _id: new ObjectId(req.params.id) };
  imageSchema.findByIdAndRemove(where, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(RFC.H301).json({ msg: DELETE_DATA });
    }
  });
};
