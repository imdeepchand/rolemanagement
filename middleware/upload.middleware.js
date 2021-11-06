const Multer = require('multer');
const path = require('path');
const { v4 } = require('uuid');
const uploadPath = './public/image';
const storage = Multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cd) {
        cd(null, v4() + 'image' + path.extname(file.originalname))
    }
})

const validator =  (req, file, cd) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'){
        cd(null, true)
    } else {
        cd(null, false)
    }
}

exports.uploadImg = Multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }, fileFilter: validator
}).single('image');