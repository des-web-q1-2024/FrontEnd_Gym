import React, { useEffect, useState, useContext } from "react";
import UserContext from "../Usuarios/UserContext";
import axios from "axios";

export const CardEventos = () => {
  const [dataMuro, setDataMuro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedEvents, setLikedEvents] = useState([]);
  const { userLogin } = useContext(UserContext);
  const [likesCount, setLikesCount] = useState({});

  const getDatos = async () => {
    try {
      const urlEventos = "http://localhost:3000/api/evento";
      const responseEventos = await axios.get(urlEventos);
      const eventos = responseEventos.data;

      const likesPromises = eventos.map(async (evento) => {
        const urlLikes = `http://localhost:3000/api/Muro/${evento.id}`;
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
    userLogin.id = 19; // Temporal, asegúrate de usar el id real del usuario logueado.
    try {
      const isLiked = likedEvents.includes(id);
      setLikedEvents((prevLikedEvents) => {
        if (isLiked) {
          return prevLikedEvents.filter((eventId) => eventId !== id);
        } else {
          return [...prevLikedEvents, id];
        }
      });

      let newLikesCount;
      if (isLiked) {
        const response = await axios.delete('http://localhost:3000/api/Muro', {
          data: {
            idPost: id,
            idUsuarios: userLogin.id,
          },
        });
        newLikesCount = response.data.likes;
      } else {
        const response = await axios.post('http://localhost:3000/api/Muro', {
          idPost: id,
          idUsuarios: userLogin.id,
        });
        newLikesCount = response.data.likes;
      }

      setLikesCount((prevLikesCount) => ({
        ...prevLikesCount,
        [id]: newLikesCount,
      }));

      // Actualizar la cantidad de likes en dataMuro
      setDataMuro((prevDataMuro) =>
        prevDataMuro.map((evento) =>
          evento.id === id ? { ...evento, likes: newLikesCount } : evento
        )
      );

    } catch (error) {
      console.error('Error al manejar like', error);
    }
  };

  return (
    <>
      <div className="col-12 px-0">
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
                  <div className="event-content">
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
                  <div className="event-footer">
                    <p>
                      <i className="fa-solid fa-comment"></i>{" "}
                    </p>
                    <p>
                      <i className="fa-solid fa-bookmark"></i>{" "}
                    </p>
                    <p>
                      <i className="fa-solid fa-heart"></i> {evento.likes}
                    </p>
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
