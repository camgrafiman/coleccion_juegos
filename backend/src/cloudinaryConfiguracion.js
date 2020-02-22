const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'cloudcamgraf',
  api_key: '997535939772535',
  api_secret: 'vckDGuIfbjezxQN2T-YEIg5dGCc'
});

module.exports.uploads = (archivo) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(archivo, (resultado) => {
            /* Resultado de la subida a cloudinary con los datos que nos da */
            //console.log(resultado)
            /* resultado.url es la url que va a ser retornada para acceder a la imagen | public_id es el identificador unico que es una url segura usada como referencia de la carga*/
            resolve({
                url: resultado.url,
                id: resultado.public_id,
                url_segura: resultado.secure_url,
                width: resultado.width,
                height: resultado.height,
                formato: resultado.format,
                fecha_creacion: resultado.created_at,
                nombre_original: resultado.original_filename

            })
        }, {resource_type: "auto"})
    })
}

// module.exports = cloudinaryConfiguracion;