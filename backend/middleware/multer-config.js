const multer = require('multer');

// Prend le format d'image
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
    'image/webp': 'webp',
    'image/gif': 'gif'
}

// Prend le dossier "images" et stock les images en ajoutant la date dans le nom de l'image pour éviter des doublons
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, '../frontend/public/uploads/post/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        const clearName = name.substr(0, name.indexOf(extension)-2)
        console.log(clearName);
        callback(null, clearName + Date.now() + '.' + extension);
    }
})

module.exports = multer({storage}).single('image');