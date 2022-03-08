const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pictures");
  },
  filename: (req, file, cb) => {
    const format = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, format);
  },
});

const uploads = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, //2Mb
});

const single = uploads.single("image");
const multiple = uploads.array("images", 3);

const multerHandler = (req, res, next) => {
  single(req, res, (err) => {
    if (err && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ msg: "File size exceeds the limit" });
    } else if (err) {
      console.log("ojan " + err);
      return res
        .status(400)
        .json({ msg: "Only .png, .jpg and .jpeg format allowed!" });
    }
    next();
  });
};

const multiUpload = (req, res, next) => {
  multiple(req, res, (err) => {
    if (err && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ msg: "File size exceeds the limit" });
    } else if (err) {
      console.log("ojan " + err);
      return res
        .status(400)
        .json({ msg: "Only .png, .jpg and .jpeg format allowed!" });
    }
    next();
  });
};

module.exports = { multerHandler, multiUpload };
