import React , { useState }from 'react';
import LeftPanel from './LeftPanel';
import './Muro.css';
import { CardEventos } from './CardEventos';
import  SavedEvents  from './SavedEvents'
const MuroPrincipal = () => {

  const [savedEvent, setSavedEvent] = useState([]);

  return (
    <>
    <div className="container">
        <div className="row mt-5">
          <div className="col-3 col-sm-3 col-md-3 col-lg-3">
            <LeftPanel />
          </div>
          <div className="col-9 col-sm-9 col-md-9 col-lg-6">
            <CardEventos setSavedEvent={setSavedEvent} savedEvent={savedEvent}/>
          </div>
          <div className="col-3 col-sm-3 col-md-3 col-lg-3">
            <SavedEvents />
          </div>
        </div>
    </div> 
    </>

  );
};

export default MuroPrincipal;
