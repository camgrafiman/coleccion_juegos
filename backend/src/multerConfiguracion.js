/* Multer es un Middleware de Node.js que es usado para tratar multipart/form-data, mayoritariamente usado para subir archivos. 
NOTA: Multer  no procesará formularios que no tengan el multipart. (multipart/form-data). */
const multer = require('multer');

/* Crea un espacio para guardar archivos */
// multer.diskStorage();


const almacenamiento = multer.diskStorage({
  /*destination: donde quiero guardar mis archivos */
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, './src/archivos/imagenes');
    } else {
      cb({ message: 'Este archivo no es un archivo de imagen' }, false);
    }
  },
  /*filename: como quiero nombrar mis archivos */
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
  
});
const limiteSubida = { fileSize: 1 * 1024 * 1024 };

const cargaMulter = multer({
  storage: almacenamiento,
  limits: {
    fileSize: limiteSubida
  },
  onError: (err, next) => {
    console.log("ERROR: ", err);
    next(err);

  }
}).single('rutaImg');

module.exports = cargaMulter;