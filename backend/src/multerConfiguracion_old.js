const multer = require('multer');

/* Crea un espacio para guardar archivos */

const storage = multer.memoryStorage();
//.single('image'); specifies the field name multer should go to when it’s looking for the file.
const cargaMulter = multer({ storage }).single('image');

// module.exports = cargaMulter;
module.exports = cargaMulter;