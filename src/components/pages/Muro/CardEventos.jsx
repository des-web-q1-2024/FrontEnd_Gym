import React, { useEffect, useState, useContext } from "react";
import UserContext from "../Usuarios/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

export const CardEventos = (props) => {
  const [dataMuro, setDataMuro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedEvents, setLikedEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const { userLogin } = useContext(UserContext);
  const urlBase = `${import.meta.env.VITE_URL}/api/participaciones`;

  const [dataForm, setDataForm] = useState({
    logro: "",
    idusuarios: 0,
    idevento: 0,
  });

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
    try {
      const urlEventos = `${import.meta.env.VITE_URL}/api/evento`;
      const responseEventos = await axios.get(urlEventos);
      const eventos = responseEventos.data;

      const likesPromises = eventos.map(async (evento) => {
        const urlLikes = `${import.meta.env.VITE_URL}/api/Muro/${evento.id}`;
        const responseLikes = await axios.get(urlLikes);
        return {
          ...evento,
          likes: responseLikes.data[0]?.like || 0,
        };
      });

      const eventosConLikes = await Promise.all(likesPromises);
      setDataMuro(eventosConLikes);
    } catch (err) {
      console.error("Error al cargar los datos", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);

  const handleLike = async (id) => {
    // userLogin.id = 19; // Temporal, asegurase de usar el id real del usuario logueado.
    try {
      const isLiked = likedEvents.includes(id);
      let newLikesCount;

      if (isLiked) {
        await axios.delete(`${import.meta.env.VITE_URL}/api/Muro`, {
          data: {
            idEvento: id,
            idUsuarios: userLogin.id,
          },
        });
        newLikesCount =
          parseInt(dataMuro.find((evento) => evento.id === id).likes, 10) - 1;

      } else {
        await axios.post(`${import.meta.env.VITE_URL}/api/Muro`, {
          idEvento: id,
          idUsuarios: userLogin.id,
        });
        newLikesCount =
          parseInt(dataMuro.find((evento) => evento.id === id).likes, 10) + 1;
      }

      // Actualizar likedEvents
      setLikedEvents((prevLikedEvents) => {
        if (isLiked) {
          return prevLikedEvents.filter((eventId) => eventId !== id);
        } else {
          return [...prevLikedEvents, id];
        }
      });

      // Actualizar dataMuro
      setDataMuro((prevDataMuro) =>
        prevDataMuro.map((evento) => {
          if (evento.id === id) {
            return {
              ...evento,
              likes: newLikesCount >= 0 ? newLikesCount : 0,
            };
          }
          return evento;
        })
      );
    } catch (error) {
      console.error("Error al manejar like", error);
    }
  };

  const handleSave = async (id) => {
    // userLogin.id = 19; // Temporal, asegúrate de usar el id real del usuario logueado.
    try {

      const isSaved = savedEvents.includes(id);
      console.log(savedEvents.includes(id))
      if (isSaved) {
        console.log('eliminar')
        await axios.delete(`${import.meta.env.VITE_URL}/api/Muro/saveEvent`, {
          data: {
            idEvento: id,
            idUsuarios: userLogin.id,
          },
        });
        props.setSavedEvent((prevSavedEvent) =>
          prevSavedEvent.filter((eventId) => eventId !== id)
        );


      } else {

        await axios.post(`${import.meta.env.VITE_URL}/api/Muro/saveEvent`, {
          idEvento: id,
          idUsuarios: userLogin.id,
        });
        props.setSavedEvent((prevSavedEvent) => [...prevSavedEvent, id]);
      }

      // Actualizar savedEvents
      setSavedEvents((prevSavedEvents) => {
        if (isSaved) {
          return prevSavedEvents.filter((eventId) => eventId !== id);
        } else {
          return [...prevSavedEvents, id];
        }
      });
      //  getSavedEvents();
      props.incrementarContador();
    } catch (error) {
      console.error("Error al manejar save", error);
    }
  };

  return (
    <>
      <div className="col-12 px-0 ms-4">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        ) : (
          dataMuro.map((evento) => (
            <div className="upcoming-events" key={evento.id}>
              <div className="event-container">
                <div className="card event-card">
                  <div className="event-header">
                    <img
                      src={`data:${evento.mime_type};base64,${evento.foto}`}
                      alt=""
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        objectFit: "fill",
                      }}
                    />
                    <p>
                      {evento.fecha
                        ? evento.fecha.slice(0, 10)
                        : "Fecha no disponible"}
                    </p>
                    <i
                      className={
                        likedEvents.includes(evento.id)
                          ? "bx bx-heart like-btn bounce-in fa-solid fa-heart"
                          : "bx bxs-heart like-btn fa-regular fa-heart"
                      }
                      onClick={() => handleLike(evento.id)}
                    ></i>
                  </div>
                  <div className="event-content text-white-50">
                    <h2>{evento.nombre}</h2>
                    <p
                      style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {evento.descripcion}
                    </p>
                  </div>
                  <div className="event-footer text-white-50">
                    <p>
                      <i className="fa-solid fa-comment"></i>{" "}
                    </p>
                    <p>
                      <i
                        className={
                          savedEvents.includes(evento.id)
                            ? "fa-solid fa-bookmark"
                            : "fa-regular fa-bookmark"
                        }
                        onClick={() => handleSave(evento.id)}
                      ></i>{" "}
                    </p>
                    <p>
                      <i className="fa-solid fa-heart"></i> {evento.likes}
                    </p>
                    <button
                      type="button"
                      className="btn btn-success ms-5"
                      onClick={() => handlerSaveParticipacionAlumno(evento.id)} >
                      Registrarse
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
