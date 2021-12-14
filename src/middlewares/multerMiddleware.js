const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        folder = path.join(__dirname, "../../public/images/productImages");
        callback(null,folder);
    },
    filename: (req,file,callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null,imageName);
    }
})
let fileUpload = multer({ storage});

module.exports = fileUpload;

// falta avatars