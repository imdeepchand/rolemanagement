const { response } = require("express");
const imageSchema = require("../models/image.model");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const {RFC} = require('../frozen/msgAndStatusCode');
const Public = "../../restFull-API/public";

const unlinkImage = (req, res, next) => {
  const where = { _id: new ObjectId(req.params.id) };
  imageSchema.findOne(where, (error, data) => {
    if (error) console.log(error);
    else {
      const Path = data.image;
      const nPath = Path.split("http://localhost:8080/public");
      let NewPath = `${Public}${nPath[1]}`;
      fs.unlink(NewPath, function (error) {
        if (error) {
          return res.status(RFC.H204).json({ message: error });
        } else {
          console.log("successfully unlink Image!");
        }
      });
    }
  });
  return next();
};
module.exports = unlinkImage;
