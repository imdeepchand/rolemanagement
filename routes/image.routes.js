const express = require('express');
const app = express();
const auth = require('../helpers/jwt.helper');
const { store, getImage, updateById } = require('../controllers/image.controler');
const { uploadImg } = require('../midelware/upload.midel');
// Express route
const imageRouter = express.Router();

//image 
imageRouter.post('/image', auth,uploadImg, store);
imageRouter.post('/delete/:id',auth,uploadImg,updateById);
imageRouter.get('/getimage', auth,getImage);
module.exports = imageRouter;