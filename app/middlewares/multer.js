
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, './app/uploads');//location where you want to save the file
    },
    filename: function (req, file, cb) {
     return cb(null, `${Date.now()}-${file.originalname}`);//creating a unique file name
    }
  })
  
  const upload = multer({ storage });//creating a upload instance of multer storage
  // const upload = multer({
  //   storage: storage,
  //   limits: {
  //     fileSize: 10 * 1024 * 1024, // Set a reasonable maximum file size (e.g., 10 MB)
  //   },
  // });

  module.exports = {
    upload,
  }