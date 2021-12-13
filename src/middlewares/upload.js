const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/pictures/image');
    },
    filename: (req, file, cb) => {
        const fileFormat = `${file.fieldname}-${Date.now()}
        ${path.extname(file.originalname)}`;
        cb(null, fileFormat);
    },
});
const multerOptions = { storage };

module.exports = multer(multerOptions);