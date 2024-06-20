import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../../../styles/Eventos.css";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import { CardEvento } from "./CardEvento";
import Swal from "sweetalert2";

const Eventos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [contador, setContador] = useState(0);
  const [op, setOp] = useState(null);
  const [id, setId] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    foto: "",
    fecha: "",
    descripcion: "",
  });

  const handleEditarEvento = (ops, id = "", nombre = "", foto = "", fecha = "", descripcions = "", mime_type = "") => {
    setOp(ops);
    setId(id);
    if (ops === 1) {
      setForm({
        nombre: "",
        foto: "",
        fecha: "",
        descripcion: "",
      });
      setTitleModal("Crear Evento");
    } else {
      setTitleModal("Editar Evento");
      setForm({
        nombre,
        foto,
        fecha,
        descripcion: descripcions,
      });
      if (foto) {
        const imgElement = document.getElementById("mostrarFoto");
        const fileInputElement = document.getElementById("fileInputEstile");
        if (imgElement && fileInputElement) {
          imgElement.style.display = "inline-block";
          fileInputElement.style.display = "none";
          let fotoData = `data:${mime_type};base64,${foto}`;
          imgElement.src = fotoData;
        }
      }
    }
  };

  const enviar = (event) => {
    event.preventDefault();
    if (op === 1) {
      submitHandler();
    } else if (op === 2) {
      handlerActualizar();
    }
  };

  const handlerActualizar = async () => {
    const url = `${import.meta.env.VITE_URL}/api/evento/${id}`;
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("foto", form.foto);
    formData.append("fecha", form.fecha);
    formData.append("descripcion", form.descripcion);

    setIsLoading(true);
    try {
      await axios.put(url, formData);
      Swal.fire({
        icon: "success",
        title: "Evento editado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      setContador((prevContador) => prevContador + 1);
      limpiarCampos();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al actualizar el evento: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const limpiarCampos = () => {
    setForm({
      nombre: "",
      foto: "",
      fecha: "",
      descripcion: "",
    });
    setMensaje("");
    const imgElement = document.getElementById("mostrarFoto");
    const fileInputElement = document.getElementById("fileInputEstile");
    if (imgElement && fileInputElement) {
      imgElement.style.display = "none";
      fileInputElement.style.display = "block";
    }
    const inputFile = document.getElementById("inputFile");
    if (inputFile) inputFile.value = null;
  };

  const onChangeHandler = (event) => {
    const { name, value, files } = event.target;
    if (name === "foto" && files.length > 0) {
      const img = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgDataUrl = e.target.result;
        const imgElement = document.getElementById("mostrarFoto");
        const fileInputElement = document.getElementById("fileInputEstile");
        if (imgElement && fileInputElement) {
          imgElement.src = imgDataUrl;
          imgElement.style.display = "inline-block";
          fileInputElement.style.display = "none";
        }
      };
      reader.readAsDataURL(img);
      setForm({ ...form, [name]: img });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitHandler = async () => {
    const url = `${import.meta.env.VITE_URL}/api/evento`;
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("foto", form.foto);
    formData.append("fecha", form.fecha);
    formData.append("descripcion", form.descripcion);

    setIsLoading(true);
    try {
      await axios.post(url, formData);
      Swal.fire({
        icon: "success",
        title: "Evento creado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      setContador((prevContador) => prevContador + 1);
      limpiarCampos();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al crear el evento: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltrarPorFecha = () => {
    setContador((prevContador) => prevContador + 1);
  };

  return (
    <>
      <section className="col-12 mb-5">
        <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12 mx-auto">
          <div className="card card-evento" style={{ height: "220px" }}>
            <h5 className="card-header text-white ff-inter fw-medium">Crear eventos</h5>
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
          <div className="card card-evento">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-header text-white ff-inter fw-medium">Mis Eventos</h5>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end gap-2">
                <div className="row">
                  <div className="col-auto d-flex align-items-center">
                    <label htmlFor="staticEmail2" className="text-white ff-inter">
                      Filtrar por fecha:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="date"
                      className="form-control events"
                      value={filtroFecha}
                      onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleFiltrarPorFecha}
                    >
                      Filtrar
                    </button>
                  </div>
                </div>
                <div className="dropdown">
                  <button className="btn btn-orange dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Categorías
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Acción
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Otra acción
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Algo más aquí
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

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {titleModal}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => limpiarCampos()}></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <form onSubmit={enviar} id="form1">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label className="form-label text-white ff-inter fw-medium">Nombre del evento</label>
                        <input
                          type="text"
                          className="form-control events"
                          id="nombre"
                          name="nombre"
                          value={form.nombre}
                          onChange={onChangeHandler}
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label className="form-label text-white ff-inter fw-medium">Fecha del evento</label>
                        <input
                          type="date"
                          className="form-control events"
                          id="fecha"
                          name="fecha"
                          value={form.fecha}
                          onChange={onChangeHandler}
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label className="form-label text-white ff-inter fw-medium">Descripción</label>
                        <textarea
                          rows="2"
                          className="form-control events"
                          id="descripcion"
                          name="descripcion"
                          value={form.descripcion}
                          onChange={onChangeHandler}
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label className="form-label text-white ff-inter fw-medium">Foto del evento</label>
                        <input
                          type="file"
                          className="form-control events"
                          id="inputFile"
                          name="foto"
                          onChange={onChangeHandler}
                          required
                        />
                        <img
                          id="mostrarFoto"
                          alt="preview"
                          style={{ display: "none", width: "100%", marginTop: "10px" }}
                        />
                        <div id="fileInputEstile" style={{ display: "none" }}>
                          <input type="file" className="form-control events" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {mensaje && (
                  <div className="alert alert-success mt-3" role="alert">
                    {mensaje}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => limpiarCampos()}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" form="form1" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Eventos;

