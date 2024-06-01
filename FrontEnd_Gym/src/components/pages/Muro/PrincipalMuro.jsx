import React, { useState } from "react";
import LeftPanel from "./LeftPanel";
import "./Muro.css";
import { CardEventos } from "./CardEventos";
import SavedEvents from "./SavedEvents";
const MuroPrincipal = () => {
  const [savedEvent, setSavedEvent] = useState([]);
  const [contador, setContador] = useState(0);

  const incrementarContador = () => {
    setContador((prevContador) => prevContador + 1)
  }


  console.log(contador)

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-1 col-sm-1 col-md-1 col-lg-1">
            <LeftPanel />
          </div>
          <div className="col-9 col-sm-9 col-md-9 col-lg-7">
            <CardEventos
              setSavedEvent={setSavedEvent}
              savedEvent={savedEvent}
              incrementarContador={incrementarContador}
            />
          </div>
          <div className="col-3 col-sm-3 col-md-3 col-lg-4 ">
            <SavedEvents contador={contador} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MuroPrincipal;
