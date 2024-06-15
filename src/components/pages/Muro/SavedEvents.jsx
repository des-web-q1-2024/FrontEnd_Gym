import React, { useEffect, useState, useContext } from "react";
import UserContext from "../Usuarios/UserContext";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/SavedEvents.css";  // Asegúrate de crear este archivo para los estilos adicionales

const SavedEvents = ({ contador }) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userLogin } = useContext(UserContext);

  const getSavedEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/Muro/saveEvent/${userLogin.id}`
      );
      setSavedEvents(response.data);
    } catch (err) {
      console.error("Error al cargar los eventos guardados", err);
    } finally {
      setIsLoading(false);
    }
  };

  const truncateDescription = (description) => {
    if (description.length > 40) {
      return `${description.slice(0, 40)}...`;
    }
    return description;
  };

  useEffect(() => {
    getSavedEvents();
  }, [contador]);


  return (
    <>
      <div className="interaction-control interactions">
        <ThemeSwitcher />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 px-0 right-content">
            <div className="analytics">
              <h2 className="ms-5">Eventos Guardados</h2>
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </div>
              ) : (
                savedEvents.map((evento) => (
                  <div className="col-12 col-md-6 col-lg-4 mb-4" key={evento.save_id || evento.id}>
                    <div className="cardSaveEvent h-100">
                      <div className="card-headerSaveEvent bg-dark text-white">
                        <h5 className="card-titleSaveEvent mb-0">{evento.nombre}</h5>
                      </div>
                      <div className="card-bodySaveEvent">
                        <img
                          src={`data:${evento.mime_type};base64,${evento.imgevento}`}
                          alt=""
                          className="img-fluid mb-3"
                        />
                        <p className="card-textSaveEvent">{truncateDescription(evento.descripcion)}</p>
                      </div>
                      <div className="card-footerSaveEvent bg-dark text-white">
                        <small className="text-muted">
                          Guardado el: {new Date(evento.date_save).toLocaleDateString()}
                        </small>
                        <p className="view-more mb-0 text-white">Ver más</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedEvents;
