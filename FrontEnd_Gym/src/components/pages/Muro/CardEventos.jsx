import React, { useEffect, useState } from "react";
import axios from "axios";

export const CardEventos = () => {
  const [dataMuro, setDataMuro] = useState([]);
  const [contador, setContador] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [likedEvents, setLikedEvents] = useState([]);

  const getDatos = async () => {
    try {
      const url = "http://localhost:3000/api/evento";
      const response = await axios.get(url);
      setDataMuro(response.data);
    } catch (err) {
      throw new err("Error al cargar los datos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, [contador]);

  const handleLike = (id) => {
    setLikedEvents((prevLikedEvents) => {
      if (prevLikedEvents.includes(id)) {
        console.log(likedEvents)
        return prevLikedEvents.filter((eventId) => eventId !== id);
      } else {
        console.log(likedEvents)
        return [...prevLikedEvents, id];
      }
      
    });
  };

  return (
    <>
      <div className="col-12 px-0">
        {isloading ? (
          <div className="d-flex justify-content-center ">
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
                    <h2 className="text-white">{evento.nombre}</h2>
                    <p className="text-white"
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
                      <i className="fa-solid fa-heart"></i>
                    </p>
                  </div>

                  {/* <div className="card bg-eventos mt-3">
                <img
                  src={`data:${evento.mime_type};base64,${evento.foto}`}
                  className="muro-evento"
                  alt="evento"
                />
                <div className="card-body">
                  <span className="fecha-evento ff-inter">
                    {evento.fecha
                      ? evento.fecha.slice(0, 10)
                      : "Fecha no disponible"}
                  </span>
                  <h6 className="card-title text-white ff-inter mt-2">
                    {evento.nombre}
                  </h6>
                  <p className="text-white ff-inter fs-8">
                    {evento.descripcion}
                  </p>
                  <div className="gap-2 d-flex justify-content-between border-top pt-2">
                    <span className="text-white">
                      <i class="fa-solid fa-heart"></i> 1
                    </span>
                    <span className="text-white">2 comentarios</span>
                  </div>
                  <div className="d-grid gap-2 d-flex">
                    <button
                      className="btn btn-primary btn-sm w-50"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Me gusta <i class="fa-solid fa-heart"></i>
                    </button>
                    <button
                      className="btn btn-success btn-sm w-50"
                      type="button"
                    >
                      Comentarios <i class="fa-solid fa-comment"></i>
                    </button>
                    <button
                      className="btn btn-secondary btn-sm w-50"
                      type="button"
                    >
                      Guardar <i class="fa-solid fa-bookmark"></i>
                    </button>
                  </div>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
