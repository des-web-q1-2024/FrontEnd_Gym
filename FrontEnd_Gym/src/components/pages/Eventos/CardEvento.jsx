import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../../../styles/Eventos.css";
import Swal from "sweetalert2";
export const CardEvento = ({ contador, handleEditarEvento, filtroFecha }) => {
  const [data, setData] = useState([])
  const [filtroData, setFiltroData] = useState([])
  const getDatos = async () => {
    const url = 'http://localhost:3000/api/evento'
    const response = await axios.get(url)
    setData(response.data)
  }

  const getDatosFiltrados = async () => {
    const url = `http://localhost:3000/api/evento/${filtroFecha}`
    const response = await axios.get(url)
    setFiltroData(response.data)
  }
  useEffect(() => {
    getDatos()
    getDatosFiltrados()
  }, [contador])
  
  console.log(`la fecha pasada como props es: ${filtroFecha}`)
  const handleEditarPerfil = (ops, evento, nombre, foto, fecha, descripcion, mime_type) => {
    handleEditarEvento(ops, evento, nombre, foto, fecha, descripcion, mime_type);
  };
  const handleEliminarPerfil = async (id) => {
    try {
      const url = `http://localhost:3000/api/evento/${id}`
      Swal.fire({
        title: "Seguro que quieres eliminar este evento?",
        text: "Una vez eliminado no se podra restableser!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(url);
          Swal.fire({
            title: "Evento eliminado!",
            icon: "success"
          });
        }
        getDatos()
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Eliminado",
        text: "Error al eliminar perfil" + error,
      });
    }
  };
  return (
    <>
      {
        filtroFecha && filtroData.length > 0 ? (
          filtroData.map((evento) => (
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
                    <button className="btn btn-primary btn-sm w-50" type="button" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" onClick={() => handleEditarPerfil(2, evento.id, evento.nombre, evento.foto, evento.fecha.slice(0, 10), evento.descripcion, evento.mime_type)}>Editar</button>
                    <button className="btn btn-danger btn-sm w-50" type="button" onClick={() => handleEliminarPerfil(evento.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          data.map((evento) => (
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
                    <button className="btn btn-primary btn-sm w-50" type="button" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" onClick={() => handleEditarPerfil(2, evento.id, evento.nombre, evento.foto, evento.fecha.slice(0, 10), evento.descripcion, evento.mime_type)}>Editar</button>
                    <button className="btn btn-danger btn-sm w-50" type="button" onClick={() => handleEliminarPerfil(evento.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      }
    </>
  )
}