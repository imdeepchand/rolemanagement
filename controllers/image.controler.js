const { config } = require("../config/config");
const imageSchema = require("../models/image.model");
const { ObjectId } = require("mongodb");
const unlinkImage = require("../midelware/fs.midelware");

exports.store = (req, res, next) => {
  imageSchema.create(
    {
      image: `${config.ImagePath}/public/image/${req.file.filename}`,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(201).json({ msg: "successfully uploaded!" });
      }
    }
  );
};

exports.getImage = (req, res, next) => {
  imageSchema.find((error, data) => {
    if (error) console.log(error);
    else {
      res.status(302).json({
        data: data,
        msg: "Successfully Get",
      });
    }
  });
};

exports.updateById = (req, res) => {
  const where = { _id: new ObjectId(req.params.id) };
  imageSchema.findOne(where, (error, data) => {
    if (error) console.log(error);
    else {
      unlinkImage(data.image);
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
            res.status(301).json({ data: data, msg: "successfully updated!" });
          }
        }
      );
    }
  });
};

exports.deleteById = (req, res) => {
  const where = { _id: new ObjectId(req.params.id) };
  imageSchema.findOne(where, (error, data) => {
    if (error) console.log(error);
    else {
      unlinkImage(data.image);
      imageSchema.findByIdAndRemove(where, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(301).json({ msg: "successfully deleted!" });
        }
      });
    }
  });
};
