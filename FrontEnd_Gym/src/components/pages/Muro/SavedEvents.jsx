import React, { useEffect, useState, useContext } from "react";
import UserContext from "../Usuarios/UserContext";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import axios from "axios";

const SavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userLogin } = useContext(UserContext);

  const getSavedEvents = async () => {
    try {
      userLogin.id = 19; // Temporal, asegúrate de usar el id real del usuario logueado.
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
    if (description.length > 20) {
      return `${description.slice(0, 40)}...`;
    }
    return description;
  };

  useEffect(() => {
    getSavedEvents();
  }, []);

  return (
    <>
      <div class="interaction-control interactions">
        <ThemeSwitcher />
      </div>
      <div className="col-12 px-0 right-content ">
        <div className="analytics">
          <h2 className="ms-2">Eventos Guardados</h2>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
            </div>
          ) : (
            savedEvents.map((evento) => (
              <div
                className="saved-event-card ms-2 "
                key={evento.save_id || evento.id}
              >
                <div className="event-thumbnail">
                  <img
                    src={`data:${evento.mime_type};base64,${evento.imgevento}`}
                    alt=""
                  />
                </div>
                <div className="event-details ms-4">
                  <h2>{evento.nombre}</h2>
                  <p>{truncateDescription(evento.descripcion)}</p>
                  <p>
                    Guardado el:{" "}
                    {new Date(evento.date_save).toLocaleDateString()}
                  </p>
                  <p className="view-more">Ver más</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SavedEvents;
