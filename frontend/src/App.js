import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navegacion from './componentes/Navegacion';
import ListaJuegos from './componentes/ListaJuegos';
import Footer from './componentes/Footer';
import CrearJuego from './componentes/CrearJuego';
import CrearUsuario from './componentes/CrearUsuario';

function App() {
  return (
    <Router>
      <Navegacion />
      <div className='container-p-4'>
        <Route exact path='/' component={ListaJuegos} />
        <Route path='/editarjuego/:id' component={CrearJuego} />
        <Route path='/crearjuego' component={CrearJuego} />
        <Route path='/crearusuario' component={CrearUsuario} />
      </div>
    </Router>
  );
}

export default App;
