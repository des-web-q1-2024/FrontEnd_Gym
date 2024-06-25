import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Swal from "sweetalert2";
import LandingPageHook from '../../../Hooks/LandingPageHook';
import { useNavigate } from 'react-router-dom';

const CardLanding = ({ filtroFecha }) => {
  const [data, setData] = useState([]);
  const [userExist, setUserExist] = useState(false)

  const { userLogin } = LandingPageHook();
  const navigate = useNavigate();
  const urlBase = `${import.meta.env.VITE_URL}/api/participaciones`;

  const [dataForm, setDataForm] = useState({
    logro: "",
    idusuarios: 0,
    idevento: 0,
  });

  useEffect(() => {
    if (userLogin && userLogin.nombre_usuario) {
      setUserExist(true);
    } else {
      setUserExist(false);
    }
  }, [userLogin]);

  const handlerSaveParticipacionAlumno = async (_id) => {
    setDataForm({
      idusuarios: userLogin.id,
      idevento: _id,
      logro: "",
    });

    let url = `${urlBase}/existe/${dataForm.idevento}/${dataForm.idusuarios}`;

    const result = await axios.get(url);
    console.log(result)
    if (result.data[0].existe == 0) {
      url = urlBase;
      await axios.post(url, dataForm);
      Swal.fire({
        icon: "success",
        title: "Participación de alumno creada con éxito",
        showConfirmButton: false,
        timer: 1700
      });
      setDataForm({
        idusuarios: 0,
        idevento: 0,
        logro: "",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Ya se encuentra inscrito en este evento.",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  const getDatos = async () => {
    // const url = 'http://localhost:3000/api/evento/recientes';
    const url = `${import.meta.env.VITE_URL}/api/evento/recientes`;
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error al obtener los eventos: ${error.message} `,
      });
    }
  };

  useEffect(() => {
    getDatos();
  }, []);

  const filteredData = useMemo(() => {
    return filtroFecha ? data.filter(evento => evento.fecha?.startsWith(filtroFecha)) : data;
  }, [data, filtroFecha]);

  return (
    <>
      {filteredData.map(evento => (
        <div key={evento.id} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div className="card bg-eventos mt-3">
            <img
              src={`data:${evento.mime_type}; base64, ${evento.foto} `}
              className="card-img-top"
              alt="evento"
            />
            <div className="card-body">
              <span className="fecha-evento ff-inter">{evento.fecha ? evento.fecha.slice(0, 10) : 'Fecha no disponible'}</span>
              <h6 className="card-title text-uppercase text-center text-white ff-inter mt-2">
                {evento.nombre}
              </h6>
              <p className='text-white text-center ff-inter fs-8'>{evento.descripcion}</p>
              {userExist && (
                <div>
                  <button className="btn btn-primary" onClick={() => navigate(`/MuroPrincipal`)}>Ver Detalles</button>
                  {userLogin.perfil == "alumno" && userExist ? (
                    <button
                      type="button"
                      className="btn btn-success ms-2"
                      onClick={() => handlerSaveParticipacionAlumno(evento.id)} >
                      Registrarse
                    </button>
                  ): (<></>)}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardLanding;
