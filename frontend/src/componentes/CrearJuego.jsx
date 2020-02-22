import React, { Component } from 'react';
import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { Multiselect } from 'multiselect-react-dropdown';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class CrearJuego extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      categoria: '',
      contenido: '',
      plataformas: [],
      plataformasOpciones: [
        { name: 'PC', id: 1 },
        { name: 'PSX', id: 2 },
        { name: 'PS2', id: 3 },
        { name: 'PS3', id: 4 },
        { name: 'PS4', id: 5 },
        { name: 'XBOX', id: 6 },
        { name: 'XBOX 360', id: 7 },
        { name: 'XBOX ONE', id: 8 },
        { name: 'PSP', id: 9 },
        { name: 'Nintendo Switch', id: 10 },
        { name: 'WII', id: 11 },
        { name: 'PSP', id: 12 },
        { name: '3DS', id: 13 },
        { name: 'Android', id: 14 },
        { name: 'iPhone', id: 15 }
      ],
      plataformasSel: [],
      companias: [],
      companiasOpciones: [
        { name: 'Electronic Arts', id: 1 },
        { name: 'Square Enix ', id: 2 },
        { name: 'Nintendo', id: 3 },
        { name: 'Sony', id: 4 },
        { name: 'XSEED Games', id: 5 },
        { name: 'Capcom', id: 6 },
        { name: 'Activision Blizzard', id: 7 },
        { name: 'Bandai Namco', id: 8 },
        { name: 'Telltale Games', id: 9 },
        { name: 'Ubisoft', id: 10 },
        { name: 'Rockstar Games', id: 11 },
        { name: 'Konami', id: 12 },
        { name: 'Sega', id: 13 },
        { name: 'Naughty Dog', id: 14 },
        { name: 'Microsoft Game Studios', id: 15 },
        { name: 'Valve', id: 16 },
        { name: 'Bethesda', id: 17 },
        { name: 'Epic Games', id: 18 },
        { name: 'Bioware', id: 19 },
        { name: 'Santa Monica Studios', id: 20 },
        { name: 'Rocksteady Studios', id: 21 },
        { name: '2K', id: 22 },
        { name: 'Lucas Arts', id: 23 },
        { name: 'WB Games', id: 24 },
        { name: 'THQ', id: 25 },
        { name: 'Guerrilla Games', id: 26 }
      ],
      companiasSel: [],
      rutaImg: null,
      rutaImgpre: 'https://via.placeholder.com/1000x1000.jpg?text=Preview',
      puntuacion: 0,
      fecha: '',
      meta: {
        votos: 0,
        favs: 0
      },
      loaded: null,
      infoSubida: '',
      alerta: 'alert alert-light',
      editando: false,
      infoEdit: {
        a: 'Creando Videojuego',
        b: 'Editando Videojuego'
      },
      idVideojuego: ''
    };
    this.cambioImagen = this.cambioImagen.bind(this);
  }

  async componentDidMount() {
    loadProgressBar();
    this.comprobarTipoPag();
  }

  async comprobarTipoPag() {
    //Comprobar si existe un id en la ruta, en ese caso estamos editando un articulo segun su id.
    if (this.props.match.params.id) {
      const datosJuegoEditable = await axios.get(
        'http://localhost:4001/api/videojuegos/' + this.props.match.params.id
      );
      console.log(datosJuegoEditable);
      this.setState({
        editando: true,
        idVideojuego: this.props.match.params.id,
        plataformas: datosJuegoEditable.data.plataformas,
        plataformasSel: datosJuegoEditable.data.plataformas,
        companias: datosJuegoEditable.data.companias,
        companiasSel: datosJuegoEditable.data.companias,
        titulo: datosJuegoEditable.data.titulo,
        contenido: datosJuegoEditable.data.contenido,
        rutaImgpre: datosJuegoEditable.data.cloudImg_segura,
        puntuacion: datosJuegoEditable.data.puntuacion,
        categoria: datosJuegoEditable.data.categoria
      });
    } else {
      this.setState({
        editando: false
      });
    }
  }

  cambioField = e => {
    this.setState({
      titulo: e.target.value
    });
  };
  cambioContenido = e => {
    this.setState({
      contenido: e.target.value
    });
  };
  cambioCategoria = e => {
    console.log(e.target.value);
    this.setState({
      categoria: e.target.value
    });
  };

  cambioImagen = evento => {
    if (evento.target.files) {
      this.leerUrlImg(evento.target);
      // this.setState({ rutaImg: URL.createObjectURL(evento.target.files[0]) });
      this.setState({ rutaImg: evento.target.files[0] });
    } else {
      alert('Debe seleccionar una imagen.');
    }
  };
  leerUrlImg = input => {
    if (input.files && input.files[0]) {
      let lector = new FileReader();

      lector.onload = e => {
        document.getElementById('imagenPreview').src = e.target.result;
      };
      lector.readAsDataURL(input.files[0]);
    }
  };

  /* Control multi seleccionador: */
  onSeleccionP = (listaSeleccionada, itemSeleccionado) => {
    this.setState({
      plataformas: listaSeleccionada,
      plataformasSel: listaSeleccionada
    });
    console.log(listaSeleccionada);
  };

  onDeseleccionP(listaSeleccionada, itemRemovido) {
    // this.setState({
    //   plataformas: listaSeleccionada
    // });
  }

  onSeleccionC = (listaSeleccionada, itemSeleccionado) => {
    this.setState({
      companias: listaSeleccionada,
      companiasSel: listaSeleccionada
    });
  };

  onDeseleccionC(listaSeleccionada, itemRemovido) {
    // this.setState({
    //   companias: this.state.companiasSel
    // });
  }

  enviarJuego = async e => {
    e.preventDefault();

    var formData = new FormData();
    var imagefile = document.querySelector('#rutaImg');
    formData.append('rutaImg', imagefile.files[0]);
    formData.append('titulo', this.state.titulo);
    formData.append('categoria', this.state.categoria);
    formData.append('contenido', this.state.contenido);
    formData.append('puntuacion', this.state.puntuacion);

    const plataformasString = JSON.stringify(this.state.plataformas);
    const companiasString = JSON.stringify(this.state.companias);
    formData.append('plataformas', plataformasString);
    formData.append('companias', companiasString);

    if (this.state.editando) {
      console.log('Estado: editando.');
      await axios
        .put(
          'http://localhost:4001/api/videojuegos/' + this.state.idVideojuego,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(res => {
          console.log(res.data);
          this.setState({
            infoSubida:
              'Se ha actualizado la información correctamente: ' +
              res.data.creado.titulo,
            alerta: 'alert alert-success'
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            infoSubida: 'No se ha actualizado la información: ' + err.data,
            alerta: 'alert alert-danger'
          });
        });
      this.setState({
        titulo: '',
        categoria: '',
        contenido: '',
        plataformas: [],
        companias: [],
        rutaImg: null,
        rutaImgpre: 'https://via.placeholder.com/1000x1000.jpg?text=Preview',
        puntuacion: 0
      });
    } else {
      await axios
        .post('http://localhost:4001/api/videojuegos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            infoSubida:
              'Se ha subido la información correctamente: ' +
              res.data.creado.titulo,
            alerta: 'alert alert-success'
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            infoSubida: 'No se ha subido la información: ' + err.data,
            alerta: 'alert alert-danger'
          });
        });
      this.setState({
        titulo: '',
        categoria: '',
        contenido: '',
        plataformas: [],
        companias: [],
        rutaImg: null,
        rutaImgpre: 'https://via.placeholder.com/1000x1000.jpg?text=Preview',
        puntuacion: 0
      });
    }
  };

  render() {
    const edit = this.state.editando;
    return (
      <ReactCSSTransitionGroup
        transitionName='anim'
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnter={false}
        transitionLeave={false}>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className={this.state.alerta} role='alert'>
                {this.state.infoSubida}
              </div>
            </div>

            <div className='col-12 text-center alert alert-info fade show'>
              {edit ? 'Editando Videojuego' : 'Creando Videojuego'}
            </div>
            <div className='py-4 col-md-6 col-sm-12'>
              <form
                className='was-validated col-12'
                method='POST'
                encType='multipart/form-data'
                onSubmit={this.enviarJuego}>
                <div className='form-group row'>
                  <label htmlFor='titulo' className='col-sm-2 col-form-label'>
                    Titulo
                  </label>
                  <div className='col-sm-10'>
                    <input
                      type='text'
                      name='titulo'
                      className='form-control'
                      id='titulo'
                      placeholder='Titulo del videojuego'
                      onChange={this.cambioField}
                      value={this.state.titulo}
                      autoComplete='off'
                      required
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='contenido'>Contenido</label>
                  <textarea
                    className='form-control'
                    name='contenido'
                    id='contenido'
                    rows='3'
                    onChange={this.cambioContenido}
                    value={this.state.contenido}
                    required></textarea>
                </div>
                <div className='form-group '>
                  <select
                    id='categoria'
                    className='custom-select'
                    onChange={this.cambioCategoria}
                    value={this.state.categoria}
                    required>
                    <option value=''>Selecciona categoria:</option>
                    <option value='RPG'>RPG</option>
                    <option value='Acción'>Acción</option>
                    <option value='Aventuras'>Aventuras</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Pelea'>Pelea</option>
                    <option value='MMORPG'>MMORPG</option>
                    <option value='Estrategia'>Estrategia</option>
                    <option value='Deportes'>Deportes</option>
                    <option value='Musical'>Musical</option>
                  </select>
                  <div className='invalid-feedback'>
                    Por favor selecciona una categoría.
                  </div>
                </div>
                <div className='custom-file'>
                  <input
                    type='file'
                    name='rutaImg'
                    className='custom-file-input'
                    id='rutaImg'
                    required
                    onChange={this.cambioImagen}
                  />
                  <label className='custom-file-label' htmlFor='rutaImg'>
                    Elegir archivo...
                  </label>
                  <div className='invalid-feedback'>
                    Por favor elige un archivo de imagen .jpg o .png. máx 1mb.
                  </div>
                </div>
                <div className='form-group '>
                  <label
                    htmlFor='plataformas'
                    className='col-sm-2 col-form-label'>
                    Plataforma(s):
                  </label>
                  <Multiselect
                    className='custom-select'
                    id='plataformas'
                    autoComplete='off'
                    options={this.state.plataformasOpciones} // Options to display in the dropdown
                    selectedValues={this.state.plataformasSel} // Preselected value to persist in dropdown
                    onSelect={this.onSeleccionP} // Function will trigger on select event
                    onRemove={this.onDeseleccionP} // Function will trigger on remove event
                    displayValue='name' // Property name to display in the dropdown options
                    required
                  />
                  <div className='invalid-feedback'>
                    Por favor selecciona una plataforma
                  </div>
                </div>

                <div className='form-group '>
                  <label
                    htmlFor='companias'
                    className='col-sm-2 col-form-label'>
                    Compañia(s):
                  </label>
                  <Multiselect
                    id='companias'
                    options={this.state.companiasOpciones} // Options to display in the dropdown
                    selectedValues={this.state.companiasSel} // Preselected value to persist in dropdown
                    onSelect={this.onSeleccionC} // Function will trigger on select event
                    onRemove={this.onDeseleccionC} // Function will trigger on remove event
                    displayValue='name' // Property name to display in the dropdown options
                    required
                  />
                </div>

                <button className='btn btn-secondary' type='submit'>
                  Agregar videojuego
                </button>
              </form>
            </div>
            <div className='py-4 col-md-6 col-sm-12'>
              <p className='font-italic text-center'>Preview de la imagen</p>
              <div className='image-area mt-4'>
                <img
                  id='imagenPreview'
                  src={this.state.rutaImgpre}
                  alt={this.state.titulo}
                  className='img-fluid rounded shadow-sm mx-auto d-block portada-vg'
                />
              </div>
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default CrearJuego;
