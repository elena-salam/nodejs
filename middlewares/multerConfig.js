const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "tmp",
    filename: function (req, file, cb) {
    //   console.log('file: ', file);    
      const ext = path.parse(file.originalname).ext;
      cb(null, Date.now() + ext);
    }
});

const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware;