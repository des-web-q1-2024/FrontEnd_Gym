import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../../styles/Eventos.css"; 
import Swal from "sweetalert2";

const CardLanding = ({ filtroFecha }) => {
  const [data, setData] = useState([]);

  const getDatos = async () => {
    const url = 'http://localhost:3000/api/evento';
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error al obtener los eventos: ${error.message}`,
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
              src={`data:${evento.mime_type};base64,${evento.foto}`}
              className="card-img-top"
              alt="evento"
            />
            <div className="card-body">
              <span className="fecha-evento ff-inter">{evento.fecha ? evento.fecha.slice(0, 10) : 'Fecha no disponible'}</span>
              <h6 className="card-title text-white ff-inter mt-2">
                {evento.nombre}
              </h6>
              <p className='text-white ff-inter fs-8'>{evento.descripcion}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardLanding;
