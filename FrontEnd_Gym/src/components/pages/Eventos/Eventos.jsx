import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../../../styles/Eventos.css";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import { CardEvento } from "./CardEvento";
import Swal from "sweetalert2";
const Eventos = () => {
  const [isloading, setIsLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [contador, setContador] = useState(0)
  const [op, setOp] = useState(null)
  const [id, setId] = useState('')
  const [filtroFecha, setFiltroFecha] = useState("0000-00-00");
  const [Form, setForm] = useState({
    nombre: "",
    foto: "",
    fecha: "",
    descripcion: "",
  });
  console.log(`la fecha por defecto es: ${filtroFecha}`)
  const handleEditarEvento = (ops, id, nombre, foto, fecha, descripcions, mime_type) => {
    setOp(ops)
    setId(id)
    if (ops === 1) {
      setForm({
        nombre: "",
        foto: "",
        fecha: "",
        descripcion: ""
      });
    } else {
      setForm({
        nombre: nombre,
        foto: foto,
        fecha: fecha,
        descripcion: descripcions
      })
      if (foto) {
        const imgElement = document.getElementById("mostrarFoto");
        const fileInputElement = document.getElementById("fileInputEstile");
        if (imgElement && fileInputElement) {
          imgElement.style.display = "inline-block";
          fileInputElement.style.display = "none";
          let fotoData = `data:${mime_type};base64,${foto}`
          console.log(`esta es la foto${fotoData}`)
          imgElement.src = fotoData
          //src = {`data:${evento.mime_type};base64,${evento.foto}`
        }
      }
    }
  }
  const enviar = () => {
    if (op === 1) {
      submitHandler()
    } else if (op === 2) {
      handlerActulualizar()
    }
  }
  const handlerActulualizar = async () => {
    event.preventDefault()
    const url = `http://localhost:3000/api/evento/${id}`
    setForm({
      nombre: Form.nombre,
      fecha: Form.fecha,
      descripcion: Form.descripcion
    })
    console.log(Form)
    setIsLoading(true)
    await axios.put(url, Form)
    setIsLoading(false)
    setMensaje('Editado con exito!')
    Swal.fire({
      icon: "success",
      title: "Evento editado con exito",
      showConfirmButton: false,
      timer: 1500
    });
    setContador(prevContador => prevContador + 1);
    limpiarCampos();
  }
  const limpiarCampos = () => {
    setForm({
      nombre: "",
      foto: "",
      fecha: "",
      descripcion: "",
    });
    setMensaje('');
    document.getElementById("mostrarFoto").style.display = "none";
    document.getElementById("fileInputEstile").style.display = "block";
    document.getElementById("inputFile").value = null;
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "foto") {
      const img = event.target.files[0];
      if (img) {
        document.getElementById("mostrarFoto").style.display = "inline-block";
        document.getElementById("fileInputEstile").style.display = "none";
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgDataUrl = e.target.result;
          const imgElement = document.getElementById("mostrarFoto");
          if (imgElement) {
            imgElement.src = imgDataUrl;
          }
        };
        reader.readAsDataURL(img);
      }
      setForm({ ...Form, [name]: img });
      return;
    }
    setForm({ ...Form, [name]: value });
  };
  const submitHandler = async () => {
    event.preventDefault();
    const url = "http://localhost:3000/api/evento";
    const datosFormulario = new FormData();
    datosFormulario.append("nombre", Form.nombre);
    datosFormulario.append("foto", Form.foto);
    datosFormulario.append("fecha", Form.fecha);
    datosFormulario.append("descripcion", Form.descripcion);
    setIsLoading(true)
    await axios.post(url, datosFormulario);
    setIsLoading(false)
    setMensaje('Publicado con exito!')
    Swal.fire({
      icon: "success",
      title: "Evento creado con exito",
      showConfirmButton: false,
      timer: 1500
    });
    setContador(prevContador => prevContador + 1);
    limpiarCampos();
  };
  const handleFiltrarPorFecha = () => {
    setContador(prevContador => prevContador + 1);
  }
  return (
    <>
      <section className="col-12 mb-5">
        <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12  mx-auto">
          <div className="card card-evento" style={{ height: "220px" }}>
            <h5 className="card-header text-white ff-inter fw-medium">
              Crear eventos
            </h5>
            <hr />
            <div className="card-body crear-event">
              <button
                type="button"
                onClick={() => handleEditarEvento(1)}
                className="btn btn-orange"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <BsPlusCircleFill className="icon" /> Nuevo Evento
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12 mt-5 mx-auto">
          <div className="card card-evento ">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-header text-white ff-inter fw-medium">
                  Mis Eventos
                </h5>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end gap-2">
                <div className="row">
                  <div className="col-auto d-flex align-items-center">
                    <label
                      htmlFor="staticEmail2"
                      className="text-white ff-inter"
                    >
                      Filtrar por fecha:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="date"
                      className="form-control events"
                      placeholder="Last name"
                      aria-label="Last name"
                      value={filtroFecha}
                      onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleFiltrarPorFecha()}
                    >
                      Filtrar
                    </button>
                  </div>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-orange dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categorias
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div className="card-body crear-event">
              <div className="row col-12">
                <CardEvento contador={contador} handleEditarEvento={handleEditarEvento} filtroFecha={filtroFecha} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-trans">
            <div className="modal-body">
              <div className="card card-evento">
                <div className="modal-header">
                  <h5 className="card-header text-white ff-inter fw-medium">
                    Crear Evento
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => limpiarCampos()}
                  ></button>
                </div>
                <div className="card-body">
                  <form onSubmit={enviar}>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label className="form-label text-white ff-inter fw-medium fs-7">
                            Miniatura del evento*
                          </label>
                          <div className="img-content">
                            <img
                              id="mostrarFoto"
                              src="#"
                              alt="Vista Previa"
                              style={{ maxWidth: "300px", maxHeight: "300px" }}
                            />
                            <label
                              className="form-label text-white ff-inter fw-medium fs-7 custom-file-upload"
                              htmlFor="inputFile"
                              id="fileInputEstile"
                            ></label>
                            <input
                              type="file"
                              className="form-control events"
                              id="inputFile"
                              name="foto"
                              onChange={onChangeHandler}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <label className="form-label text-white ff-inter fw-medium fs-7">
                            Fecha del Evento
                          </label>
                          <input
                            type="date"
                            name="fecha"
                            onChange={onChangeHandler}
                            className="form-control events"
                            value={Form.fecha}
                            placeholder="Last name"
                            aria-label="Last name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label className="form-label text-white ff-inter fw-medium fs-7">
                            Titulo
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            onChange={onChangeHandler}
                            className="form-control events"
                            value={Form.nombre}
                            id="nameEvento"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label className="form-label text-white ff-inter fw-medium fs-7">
                            Descripción
                          </label>
                          <input
                            type="text"
                            name="descripcion"
                            onChange={onChangeHandler}
                            className="form-control events"
                            value={Form.descripcion}
                            id="descripcion"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <button
                            onClick={() => enviar()}
                            className="btn btn-primary w-100 ff-inter fw-medium"
                          >
                            Publicar
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
    </>
  );
};
export default Eventos;