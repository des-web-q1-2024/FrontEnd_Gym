import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect, useState, useContext } from 'react';
import Swal from "sweetalert2";
import UserContext from '../Usuarios/UserContext';
import "../../../styles/Eventos.css";

export const CardEventosDisponibles = ({ contador, handleEditarEvento, isButtonVisible = false }) => {

  const [isloading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [eventoID, setEventoID] = useState(0);
  const [data, setData] = useState([]);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const urlBase = 'http://localhost:3000/api/participaciones';

  const [dataForm, setDataForm] = useState({
    logro: "", 
    idusuarios: 0,
    idevento: 0,
  });
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  }
  const handlerSubmit = async (e) => { 
    e.preventDefault();

    let url = `${urlBase}/${eventoID}/${dataForm.idusuarios}`;
    const result = await axios.get(url);
    const resulData = (await result).data;

    dataForm.idevento = eventoID;
    url = `${urlBase}/${resulData[0].id}`;
    await axios.put(url, dataForm);
    Swal.fire({
      icon: "success",
      title: "Logro registrado con exito",
      showConfirmButton: false,
      timer: 1700
    });
    limpiarCampos();
  }

  const handlerSaveParticipacionAlumno = async (_id) => { 
    dataForm.idevento = _id;
    dataForm.idusuarios = userLogin.id;
    dataForm.logro = "";

    let url = `${urlBase}/${dataForm.idevento}/${dataForm.idusuarios}`;
    const result = await axios.get(url);

    if (result.data.length === 0 ){
      url = urlBase;
      await axios.post(url, dataForm);
      Swal.fire({
        icon: "success",
        title: "Participación de alumno creada con exito",
        showConfirmButton: false,
        timer: 1700
      });
      limpiarCampos();
    } else {
      Swal.fire({
        icon: "success",
        title: "Ya se encuentra inscripto en este evento.",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  // Alimentacion Select Usuarios
  const [optionsParticipantes, setOptionsParticipantes] = useState([]);
  useEffect(() => {
    // URL del endpoint
    if (eventoID > 0){

      const endpoint = `${urlBase}/${eventoID}`;
      // Función para obtener datos del endpoint
      const fetchData = async () => {
        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          setOptionsParticipantes(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      fetchData();
    }
  }, eventoID);


  const handleCargaEvento = async (_id) => { 
    alert(_id);
    await setEventoID(_id);
  }
  // Alimentacion Select Eventos
  const [optionsEventos, setOptionsEventos] = useState([]);
  useEffect(() => {
    // URL del endpoint
    const endpoint = 'http://localhost:3000/api/evento/';

    // Función para obtener datos del endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setOptionsEventos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getDatos = async () =>{
    const url = 'http://localhost:3000/api/evento'
    const response = await axios.get(url)
    setData(response.data)
  }

  useEffect(()=>{
    getDatos()
  }, [contador])

  const limpiarCampos = () => {
    setDataForm({
      idusuarios: 0,
      idevento: 0,
      logro: "",
    });
    setMensaje('');
  };

  return (
    <>
      {
        data.map((evento)=>(
          <div key={evento.id} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div className="card bg-eventos mt-3">
              <img
                src={`data:${evento.mime_type};base64,${evento.foto}`} 
                className="card-img-top"
                alt="evento"
              />
              <div className="card-body">
                <span className="fecha-evento ff-inter">{evento.fecha.slice(0, 10)}</span>
                <h6 className="card-title text-white ff-inter mt-2">
                  {evento.nombre}
                </h6>
                <p className='text-white ff-inter fs-8'>{evento.descripcion}</p>

                <div className="d-grid gap-2 d-flex">
                  {userLogin.idperfil != 3 && ( 
                    <div>
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ marginRight: '20px' }}
                        onClick={() => handleCargaEvento(evento.id)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal" > 
                        Registrar Logros
                      </button>

                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => setEventoID(evento.id)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal" > 
                        Lista
                      </button>
                    </div>
                  )}
                  {userLogin.idperfil == 3 && ( 
                    <button
                      type="button"
                      className="btn btn-success margin-right:30px"
                      onClick={() => handlerSaveParticipacionAlumno(evento.id)} > 
                      Registrarse
                    </button>
                  )}
                </div>     
              </div>
            </div>
          </div>
          
        ))
      }

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">

            <div className="card card-evento">
              <div className="modal-header">
                <div className="card-body">
                  <h5 className="card-header text-white ff-inter fw-medium">
                    Crear Participación
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                  
                    <form onSubmit={handlerSubmit}>
                      <div className="row mb-3 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                          <label className="form-label text-white ff-inter fw-medium fs-7" htmlFor="idevento">
                          Evento:</label>

                          <select readOnly={true} id="idevento" name="idevento" value={eventoID} onChange={handlerChange} >
                          <option value="">Selecciona un Evento</option>
                          {optionsEventos.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="row mb-3 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <label className="form-label text-white ff-inter fw-medium fs-7" htmlFor="idusuarios">
                          Participantes:</label>

                        <select id="idusuarios" name="idusuarios" value={dataForm.idusuarios} onChange={handlerChange}>
                          <option value="">Selecciona un Participante</option>
                          {optionsParticipantes.map((option) => (
                            <option key={option.idusuarios} value={option.idusuarios}>
                              {option.nombre_usuario}
                            </option>
                          ))}
                        </select>
                        <p className="form-label text-white ff-inter fw-medium fs-7">
                          Has seleccionado: {dataForm.idusuarios}</p>
                      </div>

                      <div className="row mb-3 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <label className="form-label text-white ff-inter fw-medium fs-7">
                          Logro:</label>

                        <input
                          type="text" onChange={handlerChange} className="form-control events" value={dataForm.logro} id="logro" name="logro" />
                      </div>

                      <div className="mb-3">
                        <div className="row">
                          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <button
                              className="btn btn-primary w-100 ff-inter fw-medium" >
                              Salvar
                            </button>
                          </div>
                        </div>
                      </div>

                      {isloading ? (
                        <div className="text-center mt-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden"></span>
                          </div>
                        </div>
                      ) : null}
                      <span className="text-white text-center ff-inter">{mensaje}</span>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
