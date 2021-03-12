const resolvers = {
  /*Definir las consultas */
  Query: {
    todosUsuarios: async (parent, args, { mUsuario }) => {
      const usuarios = await mUsuario.find();
      return usuarios.map(usuario => {
        usuario._id = usuario._id.toString();
        return usuario;
      });
    },
    getUsuario: async (parent, args, { mUsuario }) => {
      let usuarioElegido = args.nombre;
      let usuarios = await mUsuario.find();
      return usuarios.filter(usuario => {
        return usuario.nombre = usuarioElegido;
      })[0]
      
    },
    todosVideojuegos: async (parent, args, { mVideojuego }) => {
      let videojuegos = await mVideojuego.find();
      return videojuegos.map(videojuego => {
        videojuego._id = videojuego._id.toString();
        return videojuego;
      });
    },
    getVideojuego: async (parent, args, { mVideojuego }) => {
      let videojuegoElegido = args._id;
      let videojuegos = await mVideojuego.find();
      let filtrado = videojuegos.filter(videojuego => {
        return videojuego.id = videojuegoElegido;
      })[0]
      return filtrado;
    }
  },
  Mutation: {
    crearUsuario: async (parent, args, { mUsuario }) => {
      const usuario = await new mUsuario(args).save();
      usuario._id = usuario._id.toString();
      return usuario;
    }
  }
};

module.exports = resolvers;