import React, { Component } from 'react';
import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';

export class CrearUsuario extends Component {
  /*Estado del componente: */
  state = {
    usuarios: [],
    nombreusuario: '',
    emailusuario: '',
    passwordusuario: ''
  };
  async componentDidMount() {
    this.getUsuarios();
    loadProgressBar();
  }
  async getUsuarios() {
    const usuarios = await axios.get('http://localhost:4001/api/usuarios');
    this.setState({ usuarios: usuarios.data });
  }
  cambioNombreUsuario = e => {
    this.setState({
      nombreusuario: e.target.value
    });
  };
  cambioEmailUsuario = e => {
    this.setState({
      emailusuario: e.target.value
    });
  };
  cambioPassUsuario = e => {
    this.setState({
      passwordusuario: e.target.value
    });
  };
  enviarUsuario = async e => {
    e.preventDefault();
    await axios
      .post('http://localhost:4001/api/usuarios', {
        nombre: this.state.nombreusuario,
        email: this.state.emailusuario,
        password: this.state.passwordusuario
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
    this.setState({
      nombreusuario: '',
      emailusuario: '',
      passwordusuario: ''
    });
    this.getUsuarios();
  };
  eliminarUsuario = async id => {
    if (window.confirm('Estas seguro que quieres borrar este usuario?')) {
      await axios.delete('http://localhost:4001/api/usuarios/' + id);
      await this.getUsuarios();
    } else {
      console.log('no ha querido borrar el usuario');
    }
  };
  render() {
    return (
      <div className='container'>
        <div className='row pt-2 pb-2'>
          <div className='col-md-4 '>
            <div className='card card-body'>
              <h3>Crear un nuevo usuario</h3>
              <form onSubmit={this.enviarUsuario}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control mb-2'
                    placeholder='Nombre'
                    required
                    value={this.state.nombreusuario}
                    onChange={this.cambioNombreUsuario}
                  />
                  <input
                    type='text'
                    className='form-control mb-2'
                    placeholder='email'
                    required
                    value={this.state.emailusuario}
                    onChange={this.cambioEmailUsuario}
                  />
                  <input
                    type='password'
                    className='form-control mb-2'
                    placeholder='password'
                    required
                    value={this.state.passwordusuario}
                    onChange={this.cambioPassUsuario}
                  />
                </div>
                <button className='btn btn-primary' type='submit'>
                  Agregar usuario
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-8'>
            <ul className='list-group'>
              {this.state.usuarios.map(usuario => (
                <li
                  className='list-group-item list-group-item-action'
                  key={usuario._id}>
                  {usuario.nombre}{' '}
                  <button
                    className='btn btn-danger float-right'
                    onClick={() => this.eliminarUsuario(usuario._id)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <p>Aquí es posible crear usuarios nuevos</p>
        </div>
      </div>
    );
  }
}

export default CrearUsuario;
