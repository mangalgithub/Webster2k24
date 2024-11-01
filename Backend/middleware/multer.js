//you can learn about multer at its documentation
//https://www.npmjs.com/package/multer
//there will be two options either to upload the file on memory or on disk storage
//but since we are using cloudinary we will be using disk storage
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // Location where the file will be stored temporarily
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage: storage });
