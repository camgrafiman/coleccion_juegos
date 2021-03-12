/*la libreria Express es una infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un conjunto sólido de características para las aplicaciones web y móviles.  */
const express = require('express');
/*Body Parser: es un nodo middleware para el handling json, raw, textos y url encoded form data*/
const bodyParser = require('body-parser');

const multer = require('multer');

/*Path: acceso a Carpeta de proyecto  */
const path = require('path');

const app = express();
const cors = require('cors');

/* ******* Integración con GraphQL ********* */
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer, gql } = require('apollo-server-express');
const schemaGql = require('../graphql_schema/schema');
const resolversGql = require('../resolvers/resolvers');

// configuración del servidor:
/* puerto en el que queremos conectar el servidor */
const puerto = process.env.PORT || 4000;
app.set('port', puerto);

//middlewares (se ejecutan antes de que llegue la info a las rutas) por ejemplo cors:
/*Usar cors y json */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Aqui doy los permisos a la app para tener acceso a las carpetas estáticas como css, imágenes, etc */
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subidas', express.static('subidas'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // HANDLING CORS ERRORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     if (req.method === 'OPTIONS') {
//         res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
//         return res.status(200).json({})
//     } next();
// });
// //HANDLE ERROR
// app.use((req, res, next) => {
//     const error = new Error('ERROR: --NO ENCONTRADO--')
//     error.status = 404
//     next(error)
// })
// app.use((error, req, res, next) => {
//     res.status(error.status || 500)
//     res.json({ error: { message: error.message } })
// })
// const cargaMulter = require('./multerConfiguracion');

// app.post('/api/videojuegos/up', cargaMulter, (req, res) => {
//     console.log('req file: ', req.file);
//     res.json(req.file);
// });

//rutas:
app.use('/api/usuarios', require('../rutas/usuarios'));
app.use('/api/videojuegos', require('../rutas/videojuegos'));

/* ******* Integración con GraphQL ********* */
const mUsuario = require('../modelos/usuario.modelo');
const mVideojuego = require('../modelos/videojuego.modelo');
//definir como luce el schema:
const apolloserver = new ApolloServer({
  
  // como lucen mis datos, propiedades
  typeDefs: schemaGql,
  //metodos y como puede consultarlos, interactuar con los datos, obtener agregar etc:
  resolvers: resolversGql,
  context: { mUsuario, mVideojuego }
});
apolloserver.applyMiddleware({
  app,
  schema: schemaGql
});
app.listen(() =>
  console.log(`🚀 Servidor Apollo listo en: ${puerto}${apolloserver.graphqlPath} `)
)

// rutas de graphql:
// app.use(
//   '/graphql',
//   bodyParser.json(),
//   graphqlExpress({
//     // schema: como van a lucir mis datos:
//     schema: schema,
//     // context: los modelos en el cual se va a guiar:
//     context: {
//       mUsuario,
//       mVideojuego
//     }
//   })
// );

/* --------------------- */
/* exportar */
module.exports = app;
