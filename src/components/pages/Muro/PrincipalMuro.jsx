import React, { useState } from "react";
import LeftPanel from "./LeftPanel";
import "./Muro.css";
import { CardEventos } from "./CardEventos";
import SavedEvents from "./SavedEvents";
import Post from "./Post";

const MuroPrincipal = () => {
  const [savedEvent, setSavedEvent] = useState([]);
  const [contador, setContador] = useState(0);

  const [mostrarComponente, setMostrarComponente] = useState("Publicaciones");

  const handleItemClick = (componente) => {
    setMostrarComponente(componente);
  };

  const incrementarContador = () => {
    setContador((prevContador) => prevContador + 1);
  };

  //console.log(contador)

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-1 col-sm-1 col-md-1 col-lg-1">
            <LeftPanel handleItemClick={handleItemClick} />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-7">
            {mostrarComponente === "Publicaciones" ? <Post /> : null}
            {mostrarComponente === "Eventos" ? (
              <CardEventos
                setSavedEvent={setSavedEvent}
                savedEvent={savedEvent}
                incrementarContador={incrementarContador}
              />
            ) : null}
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 ">
            <SavedEvents contador={contador} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MuroPrincipal;
