const { response } = require('express');
const fs = require('fs');
const Public = '../../restFull-API/public';

const unlinkImage = (Path) => {
    const nPath = Path.split('http://localhost:8080/public');
    let NewPath = `${Public}${nPath[1]}`;
    fs.unlink(NewPath,function(error) {
        if(error) console.log(error)
        else {
            console.log('successfully unlink Image!')
        }
    })
}

module.exports = unlinkImage;