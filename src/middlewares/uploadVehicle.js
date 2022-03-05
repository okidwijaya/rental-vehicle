const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    // if () return;
    cb(null, "./pictures");
  },
  filename: (req, file, cb) => {
    const format = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, format);
  },
});

// const uploadImage = multer ({
//     storage,
//     limits: {
//         fileSize: 2 * 1024 * 1024
//     },
//     fileFilter(req, file, cb) {
//         if(!file.mimetype == 'jpg' || !file.mimetype == 'png' || !file.mimetype == 'jpeg') {
//             cb(null, false);
//             return cb(new Error('Format image must jpg, img, jpeg'))
//         }
//         cb(null, true);
//     }
// });

const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      (console.log(file.mimetype),
      file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("File must type of type .jpg .png .jpeg"));
    }
  },
//   limits: { fileSize: 2 * 1024 * 1024 }
});

const multiple = uploadImage.array("images", 3);

const uploadMultiple = (req, res, next) => {
  multiple(req, res, (err) => {
    if (err && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ msg: "File is too big" });
    } else if (err) {
      return res.status(400).json({ msg: "File must type .jpg .png .jpeg" });
    }
    next();
  });
};

module.exports = uploadMultiple;