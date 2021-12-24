const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./pictures");
    },
    filename: (req, file, cb) => {
        const fileFormat = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;
        cb(null, fileFormat);
    },
});;

const multerOptions = { storage };

module.exports = multer(multerOptions);