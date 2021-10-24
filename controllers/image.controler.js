const express = require('express');
const { config } = require('../config/config')
const imageSchema = require('../models/image.model');

exports.store = (req, res, next)=>{
    imageSchema.create({
        image : `${config.ImagePath}/public/image/${req.file.filename}`
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(201).json(data)
        }
    })
}

exports.getImage = (req, res, next) => {
    imageSchema.find((error, data) => {
        if(error) console.log(error)
        else {
            res.status(302).json({
                data: data,
                msg: "Successfully Get"
            })
        }
    })
}