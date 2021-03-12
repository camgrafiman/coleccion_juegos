/*Esquema de GraphQL */
const schema = `
scalar Date

type mUsuario {
    _id: String!
    nombre: String
    password: String
    email: String
    fecha: Date
    puntuacion: Int
}

type mVideojuego {
    _id: String!
    titulo: String
    titulo_original: String
    categoria: String
    contenido: String
    plataformas: [plataforma]
    companias: [compania]
    rutaImg: String
    cloudImg: String
    cloudImg_segura: String
    formato: String
    ancho: Int
    alto: Int
    idImg: String
    puntuacion: Int
    fecha: Date
    votos: Int
    favs: Int
}

type plataforma {
    name: String
    id: Int
}
type compania {
    name: String
    id: Int
}

type Query {
    todosUsuarios: [mUsuario!]!
    todosVideojuegos: [mVideojuego!]!
    getUsuario(nombre: String!): mUsuario
    getVideojuego(_id: String!): mVideojuego
}


type Mutation {
    crearUsuario(nombre: String!, password: String!, email: String!): mUsuario!
}

`;

module.exports = schema;