import multer from 'multer'
import fs from 'fs'

// func to check if 'upload' folder exists,
// and create 'upload' if not existing
const checkIfDirExists = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true); 
    } else {
        const error = new Error('File must be a .jpg, .jpeg or .png file');
        error.status = 400;
        cb(error, false);
    }
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        checkIfDirExists('uploads')
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // max file size is 5mb 
})


export default upload