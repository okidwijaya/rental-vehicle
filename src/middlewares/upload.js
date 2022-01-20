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
});

const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function(req, file, callback) {
        // var file = path.extname(file.originalname);
        if (file !== '.png' && file !== '.jpg' && file !== '.gif' && file !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
});



const multerOptions = { storage, upload };

module.exports = multer(multerOptions);