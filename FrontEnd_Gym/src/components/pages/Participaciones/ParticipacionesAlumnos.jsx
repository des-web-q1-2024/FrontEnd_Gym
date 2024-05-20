import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useState, useContext } from "react";
import "../../../styles/Eventos.css";
import { CardEventosDisponibles } from "./CardEventosDisponibles";
import UserContext from '../Usuarios/UserContext';

const ParticipacionesAlumnos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [form, setForm] = useState({ 
    nombre: "",
    foto: "",
    fecha: "",
    descripcion: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "foto") {
      const img = event.target.files[0];

      if (img) {
        document.getElementById("mostrarFoto").style.visibility = "visible";
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
      setForm({ ...form, [name]: img });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/api/evento";
    const datosFormulario = new FormData();

    datosFormulario.append("nombre", form.nombre);
    datosFormulario.append("foto", form.foto);
    datosFormulario.append("fecha", form.fecha);
    datosFormulario.append("descripcion", form.descripcion);
    setIsLoading(true);
    await axios.post(url, datosFormulario);
    setIsLoading(false);
    setMensaje("Publicado con éxito!");
  };

  const handleRegistrarse = async (eventoId) => {
    try {
      const url = "http://localhost:3000/api/participaciones";
      const data = {
        idusuario: req.params.id, 
        idevento: eventoId,
      };
      await axios.post(url, data);
      console.log(`Registrarse en el evento con ID ${eventoId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="col-12">
        {/* Mis Eventos */}
        <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12 mt-5">
          <div className="card card-evento ">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-header text-white ff-inter fw-medium">
                  Eventos Disponibles
                </h5>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end gap-2">
                <form className="row">
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
                        MMA
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        BOXEO
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        JIUJITSU
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        LETHWEI
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <hr />

            <div className="card-body crear-event">
              <div className="row col-12">
                <CardEventosDisponibles handleRegistrarse={handleRegistrarse} isButtonVisible={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParticipacionesAlumnos;
