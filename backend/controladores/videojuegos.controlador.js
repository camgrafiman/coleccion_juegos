const vgControl = {};

/*Traer el modelo: */
const mVideojuego = require('../modelos/videojuego.modelo');
/*importar el uploader multer */
const cargaMulter = require('../src/multerConfiguracion');
/*Importar configuración de cloudinary para la subida de archivos */
const cloudinary = require('../src/cloudinaryConfiguracion');

/* PLURAL */
vgControl.getVideojuegos = async (req, res) => {
  const listaVideojuegos = await mVideojuego.find();

  res.json({
    listaVideojuegos
  });
};

/* POST - CREAR */

vgControl.crearVideojuegos = async (req, res, next) => {
  console.log(req.file);

  const limiteSubida = { fileSize: 1 * 1024 * 1024 };
  if (!req.file) {
    return res.send('Por favor suba un archivo');
  }
  if (req.file.size >= limiteSubida.fileSize) {
    return res.send('Tamaño de imagen superior al permitido: 1MB');
  } else {
    try {
      var imageDetails = {
        rutaImg: req.body.rutaImg
      };
      //USING MONGO METHOD TO FINE IF IMAGE-NAME EXIST IN THE DB
      await mVideojuego.find(
        { rutaImg: imageDetails.rutaImg },
        (err, callback) => {
          //CHECKING IF ERROR OCCURRED
          //console.log(callback);
          if (err) {
            res.json({
              err: err,
              message:
                'ERROR: Ha habido un problema al intentar subir la imagen!'
            });
          }
          // else if (callback.length >= 1) {
          //     res.json({ message: 'file already exist' })
          // }
          else {
            //console.log(res);
            var imageDetails = {
              rutaImg: req.body.rutaImg,
              cloudImg: req.file.path,
              idImg: '',
              titulo: req.body.titulo
            };
            // IF ALL THING GO WELL, POST THE IMAGE TO CLOUDINARY
            const subidaImg = cloudinary
              .uploads(imageDetails.cloudImg)
              .then(result => {
                // console.log(result);
                // console.log(req.body);
                // console.log(imageDetails);

                //var imageDetails = { titulo: req.body.titulo, rutaImg: req.body.rutaImg, cloudImg: result.url, idImg: result.id }
                const nuevoVideojuego = new mVideojuego({
                  titulo: req.body.titulo,
                  titulo_original: result.nombre_original,
                  contenido: req.body.contenido,
                  categoria: req.body.categoria,
                  plataformas: JSON.parse(req.body.plataformas),
                  companias: JSON.parse(req.body.companias),
                  rutaImg: req.body.rutaImg,
                  cloudImg: result.url,
                  cloudImg_segura: result.url_segura,
                  formato: result.formato,
                  ancho: result.width,
                  alto: result.height,
                  idImg: result.id,
                  puntuacion: req.body.puntuacion,
                  fecha: result.fecha_creacion
                });

                //Ahora crear el videojuego en la base de datos
                mVideojuego.create(nuevoVideojuego, (err, creado) => {
                  if (err) {
                    res.json({
                      err: err,
                      message:
                        'No se ha podido subir la imagen, inténtelo de nuevo.'
                    });
                  } else {
                    res.json({
                      creado: creado,
                      message: 'La imagen se ha subido correctamente!!'
                    });
                  }
                });
              });
          }
        }
      );
    } catch (errores) {
      console.log(errores);
    }
  }
};

/*DELETE ALL Videojuegos */
vgControl.borrarVideojuegos = async (req, res) => {
  /*Eliminar item pasandole el id */
  await mVideojuego.deleteMany({});
  res.json({
    mensaje: 'Videojuegos eliminados correctamente'
  });
};

/* SINGULAR */

/* GET */
vgControl.getVideojuego = async (req, res) => {
  /*pasarle el id unico para coger los datos de un único item */
  const videojuego = await mVideojuego.findById(req.params.id);
  res.json(videojuego);
};
/* POST */
vgControl.crearVideojuego = async (req, res) => {
  const {
    titulo,
    categorias,
    plataformas,
    companias,
    rutaImg,
    cloudImg,
    idImg,
    puntuacion,
    fecha
  } = req.body;
  const nuevoVideojuego = new mVideojuego({
    titulo: titulo,
    categorias: categorias,
    plataformas: plataformas,
    companias: companias,
    rutaImg: rutaImg,
    cloudImg: cloudImg,
    idImg: idImg,
    puntuacion: puntuacion,
    fecha: fecha
  });
  /*Guardar en la base de datos: */
  await nuevoVideojuego.save();
  res.json({
    mensaje: 'Videojuego n: ' + req.params.id + ' añadido!'
  });
};

vgControl.actualizarVideojuego_old = async (req, res) => {
  /* Destructuring: */
  const {
    titulo,
    categorias,
    plataformas,
    companias,
    rutaImg,
    cloudImg,
    idImg,
    puntuacion,
    fecha
  } = req.body;
  await mVideojuego.findOneAndUpdate(req.params.id, {
    titulo: titulo,
    categorias: categorias,
    plataformas: plataformas,
    companias: companias,
    rutaImg: rutaImg,
    cloudImg: cloudImg,
    idImg: idImg,
    puntuacion: puntuacion,
    fecha: fecha
  });
  res.json({
    mensaje:
      'Videojuego: ' + req.params.id + ' | ' + titulo + '  ha sido actualizado'
  });
};

vgControl.actualizarVideojuego = async (req, res, next) => {
  console.log(req.file);

  const limiteSubida = { fileSize: 1 * 1024 * 1024 };
  if (!req.file) {
    return res.send('Por favor suba un archivo');
  }
  if (req.file.size >= limiteSubida.fileSize) {
    return res.send('Tamaño de imagen superior al permitido: 1MB');
  } else {
    try {
      var imageDetails = {
        rutaImg: req.body.rutaImg
      };
      //USING MONGO METHOD TO FINE IF IMAGE-NAME EXIST IN THE DB
      await mVideojuego.find(
        { rutaImg: imageDetails.rutaImg },
        (err, callback) => {
          //CHECKING IF ERROR OCCURRED
          //console.log(callback);
          if (err) {
            res.json({
              err: err,
              message:
                'ERROR: Ha habido un problema al intentar subir la imagen!'
            });
          }
          // else if (callback.length >= 1) {
          //     res.json({ message: 'file already exist' })
          // }
          else {
            //console.log(res);
            var imageDetails = {
              rutaImg: req.body.rutaImg,
              cloudImg: req.file.path,
              idImg: '',
              titulo: req.body.titulo
            };
            // IF ALL THING GO WELL, POST THE IMAGE TO CLOUDINARY
            const subidaImg = cloudinary
              .uploads(imageDetails.cloudImg)
              .then(result => {
                // console.log(result);
                // console.log(req.body);
                // console.log(imageDetails);

                //var imageDetails = { titulo: req.body.titulo, rutaImg: req.body.rutaImg, cloudImg: result.url, idImg: result.id }
                const nuevoVideojuego = {
                  titulo: req.body.titulo,
                  titulo_original: result.nombre_original,
                  contenido: req.body.contenido,
                  categoria: req.body.categoria,
                  plataformas: JSON.parse(req.body.plataformas),
                  companias: JSON.parse(req.body.companias),
                  rutaImg: req.body.rutaImg,
                  cloudImg: result.url,
                  cloudImg_segura: result.url_segura,
                  formato: result.formato,
                  ancho: result.width,
                  alto: result.height,
                  idImg: result.id,
                  puntuacion: req.body.puntuacion,
                  fecha: result.fecha_creacion
                };

                //Ahora crear el videojuego en la base de datos
                mVideojuego.findOneAndUpdate({ _id: req.params.id }, nuevoVideojuego, (err, creado) => {
                  if (err) {
                    res.json({
                      err: err,
                      message:
                        'No se ha podido actualizar la imagen, inténtelo de nuevo.'
                    });
                  } else {
                    res.json({
                      creado: creado,
                      message: 'La imagen se ha actualizado correctamente!!'
                    });
                  }
                });
              }).catch(err => console.log(err));
          }
        }
      );
    } catch (errores) {
      console.log(errores);
    }
  }
};

vgControl.borrarVideojuego = async (req, res) => {
  /*Eliminar item pasandole el id */
  const videojuegoElim = await mVideojuego.findByIdAndDelete(req.params.id);
  res.json({
    mensaje: 'Videojuego ' + req.params.id + ' ha sido eliminado'
  });
};

module.exports = vgControl;
