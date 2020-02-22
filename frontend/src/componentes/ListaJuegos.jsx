import React, { Component } from 'react';
import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { Link } from 'react-router-dom';

export class ListaJuegos extends Component {
  state = {
    loaded: null,
    videojuegos: []
  };
  async componentDidMount() {
    loadProgressBar();
    this.cargarJuegos();
  }
  async cargarJuegos() {
    await axios
      .get('http://localhost:4001/api/videojuegos')
      .then(res => {
        this.setState({
          videojuegos: res.data.listaVideojuegos
        });
      })
      .catch(err => console.log(err));
  }
  editarJuego = id => {
    console.log(id);
  };
  eliminarJuego = async id => {
    await axios.delete('http://localhost:4001/api/videojuegos/' + id);
    this.cargarJuegos();
  };
  render() {
    return (
      <div className='container'>
        <div className='card-deck '>
          <div className='row mt-2'>
            {this.state.videojuegos.map(videojuego => (
              <div
                className='card mb-4 border-dark text-white bg-dark '
                key={videojuego._id}>
                <img
                  className='img-fluid card-img-top'
                  src={videojuego.cloudImg_segura}
                  alt={videojuego.titulo}
                />
                <div className='card-header'>
                  <h5 className='card-title text-center'>
                    {videojuego.titulo}
                  </h5>
                </div>
                <div className='card-body'>
                  <p className='card-text'>{videojuego.contenido}</p>
                </div>
                <div className='card-footer'>
                  <p className='text-center'>
                    <Link
                      to={'/editarjuego/' + videojuego._id}
                      className='badge badge-info m-1'
                      onClick={() => this.editarJuego(videojuego._id)}>
                      Editar
                    </Link>
                    <Link
                      to='/'
                      className='badge badge-danger m-1'
                      onClick={() => this.eliminarJuego(videojuego._id)}>
                      Eliminar
                    </Link>
                  </p>
                  {videojuego.companias.map(c => (
                    <p key={videojuego._id + c.id}>{c.name}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ListaJuegos;
