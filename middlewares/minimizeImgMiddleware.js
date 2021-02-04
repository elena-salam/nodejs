const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const {promises: fsPromises} = require('fs'); //for files from tmp delete
const path = require('path');

async function minifyImage(req, res, next){
    try {
     const MINIFIED_DIR = './public/images'; // const MINIFIED_DIR = path.join("public", "images");
     console.log('hello!')
     const {filename, path: tmpPath} = req.file;
 
     await imagemin([`tmp/${filename}`], { //[req.file.path] - не срабатывает.почему?
         destination: MINIFIED_DIR,
         plugins: [
             imageminJpegtran(),
             imageminPngquant({
                 quality: [0.6, 0.8]
             })
         ]
     });
     
     await fsPromises.unlink(tmpPath); //удаляем аватарки после сжатия и передачи в папку public
         // req.file.path = path.join(MINIFIED_DIR, filename);
     req.file = {
         ...req.file,
         path: path.join(MINIFIED_DIR, filename),
         destination: MINIFIED_DIR
     };
     //console.log('finished minification');
     next();
     
    } catch(err) {
        next(err);
    }
};

module.exports = {minifyImage};
 