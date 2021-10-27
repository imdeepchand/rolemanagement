const Freeze = require("../frozen/frozenObjects")
const Bcrypt = require("bcryptjs");
const StudentSchema = require('../models/student.model');
const jwt = require('jsonwebtoken');
// const saltRounds = 10;
exports.findAll = (req, res) => {
    const where = {role : Freeze.USER}
    StudentSchema.find(where,(error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(302).json(data)
        }
    })
}

exports.createOne = async (req, res, next) => {
  const  where = {email : req.body.email}
  const Hash =  await Bcrypt.hash(req.body.password, saltRounds = 10);
  StudentSchema.find(where, (error, data) => {
        if (data.length === 0) {
            StudentSchema.create({
                name: req.body.name,
                email: req.body.email,
                password: Hash,
                role: req.body.role
            }, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.status(201).json({msg: "Create successfully"})
                }
            })
        } else {
            res.status(302).json({
                data: data,
                msg: "already exist"
            })
        }
    })           
}

exports.findOne = (req, res) => {
    StudentSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(302).json(data)
        }
    })
}

exports.updateOne = (req, res, next) => {
    StudentSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
}

exports.deleteOne = (req, res, next) => {
    StudentSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(204).json({
                msg: "Record delete successfully"
            })
        }
    })
}

exports.deleteAll = (req, res, next) => {
    StudentSchema.deleteMany((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "delete all records"
            })
        }
    })
}

exports.Login = async (req,res, next) => {
    const where = {email: req.body.email};
    const user = await StudentSchema.find(where);
    const data = {}
    jwt.sign({user}, 'secretkey', { expiresIn: '2h' }, (err, token) => {
        data.user = user
        data.token = token 
      });
    if(user.length === 0){
        res.status(401).json({msg: "Wrong username or Password"});
    }
    else {
    const cmp = await Bcrypt.compare(req.body.password, user[0].password);
        if(cmp){
            res.status(200).json({data:data, msg: "login successfully" })
        } else {
            res.status(401).json({msg: "Wrong username or Password"});
        }
    }
}