import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../../../styles/Eventos.css";
import "../../../styles/Modal.css";
import { BsPlusCircleFill } from "react-icons/bs";

const Eventos = () => {
  return (
    <>
      <section className="col-10">
        <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12 mt-5">
          <div className="card card-evento" style={{ height: "220px" }}>
            <h5 className="card-header text-white ff-inter fw-medium">
              Crear eventos
            </h5>
            <hr />
            <div className="card-body crear-event">
              <button
                type="button"
                className="btn btn-orange"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <BsPlusCircleFill className="icon" /> Nuevo Evento
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12 mt-5">
          <div className="card card-evento ">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-header text-white ff-inter fw-medium">
                  Mis Eventos
                </h5>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end gap-2">
                <form className="row">
                  <div className="col-auto d-flex align-items-center">
                    <label htmlFor="staticEmail2" className="text-white ff-inter">
                      Filtrar por fecha:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="date"
                      className="form-control events"
                      placeholder="Last name"
                      aria-label="Last name"
                    />
                  </div>
                  <div className="col-auto">
                    <button type="button" className="btn btn-primary">
                      Filtrar
                    </button>
                  </div>
                </form>
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
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="card bg-eventos" style={{ width: "18rem;" }}>
                    <img
                      src="src/assets/logo-de-react.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title text-white ff-inter">
                        Pelea del maestro Sensei con Osama bin Laden.
                      </h6>
                      <span className="fecha-evento ff-inter">
                        15/5/2024
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="card bg-eventos" style={{ width: "18rem;" }}>
                    <img
                      src="src/assets/logo-de-react.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title text-white ff-inter">
                        Pelea Osama bin Laden con Donald Trump.
                      </h6>
                      <span className="fecha-evento ff-inter">
                        20/5/2024
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="card bg-eventos" style={{ width: "18rem;" }}>
                    <img
                      src="src/assets/logo-de-react.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title text-white ff-inter">
                        Pelea del maestro Sensei con Osama bin Laden.
                      </h6>
                      <span className="fecha-evento ff-inter">
                        27/5/2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* MODAL */}
      <div
        className="modal fade custom-modal"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
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
                  ></button>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                          <label className="form-label text-white ff-inter fw-medium fs-7">
                            Miniatura del evento*
                          </label>
                          <label
                            className="form-label text-white ff-inter fw-medium fs-7 custom-file-upload"
                            htmlFor="inputFile"
                          ></label>
                          <input
                            type="file"
                            className="form-control events"
                            id="inputFile"
                            style={{ display: "none" }}
                          />
                        </div>
                        <div className="col">
                          <label className="form-label text-white ff-inter fw-medium fs-7">
                            Fecha del Evento
                          </label>
                          <input
                            type="date"
                            className="form-control events"
                            placeholder="Last name"
                            aria-label="Last name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                          <label className="form-label text-white ff-inter fw-medium fs-7">
                            Nombre del Evento
                          </label>
                          <input
                            type="text"
                            className="form-control events"
                            id="nameEvento"
                          />
                        </div>
                        <div className="col">
                          <label className="form-label text-white ff-inter fw-medium fs-7">
                            Categoria*
                          </label>
                          <input
                            type="text"
                            className="form-control events"
                            id="categoria"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                          <button
                            type="submit"
                            className="btn btn-primary w-100 ff-inter fw-medium"
                          >
                            Publicar
                          </button>
                        </div>
                      </div>
                    </div>
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
