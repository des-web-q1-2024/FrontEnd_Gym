import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../../../../styles/Eventos.css"
import Menu from '../../Menu';
import {
  BsPlusCircleFill
} from "react-icons/bs";

export const Desktop = () => {
  return (
    <>
      <section className='container-fluid'>
        <div className="row">
          <div className="col-3">
              <Menu />
          </div>
          <div className="col-9">
            <div className="col-11 mt-5">
              <div className="card card-evento" style={{ height: '220px' }}>
                <h5 className="card-header text-white ff-inter fw-medium">Crear eventos</h5>
                <hr />
                <div className="card-body crear-event">
                  <button type="button" className="btn btn-orange" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <BsPlusCircleFill className='icon' /> Nuevo Evento
                  </button>
                </div>
              </div>
            </div>
            <div className="col-11 mt-5">
              <div className="card card-evento " style={{ height: '220px' }}>
               
                <div class="row align-items-center">
                  <div class="col">
                    <h5 className="card-header text-white ff-inter fw-medium">Mis Eventos</h5>
                  </div>
                  <div class="col d-flex justify-content-end">
                    <div class="dropdown">
                      <button class="btn btn-orange dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categorias
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              
                <hr />
                <div className="card-body crear-event">
                  <span className='text-white '>No hay eventos creados.</span>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL */}
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="card card-evento">
                    <div className="modal-header">
                      <h5 className="card-header text-white ff-inter fw-medium">Crear Evento</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="card-body">
                      <form>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-8">
                              <label className="form-label text-white ff-inter fw-medium fs-7">Miniatura del evento*</label>
                              <label className="form-label text-white ff-inter fw-medium fs-7 custom-file-upload" htmlFor='inputFile'></label>
                              <input type="file" className="form-control events" id="inputFile" style={{ display: "none" }} />
                            </div>
                            <div className="col">
                              <label className="form-label text-white ff-inter fw-medium fs-7">Fecha del Evento</label>
                              <input type="date" className="form-control events" placeholder="Last name" aria-label="Last name" />
                            </div>
                          </div>

                        </div>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-8">
                              <label className="form-label text-white ff-inter fw-medium fs-7">Nombre del Evento</label>
                              <input type="text" className="form-control events" id="nameEvento" />
                            </div>
                            <div className="col">
                              <label className="form-label text-white ff-inter fw-medium fs-7">Categoria*</label>
                              <input type="text" className="form-control events" id="categoria" />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-8">
                              <button type="submit" className="btn btn-primary w-100 ff-inter fw-medium">Publicar</button>
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

        </div>
      </section>
    </>
  )
}
