import React from 'react';
import LeftPanel from './LeftPanel';
import './Muro.css';
import { CardEventos } from './CardEventos';
const MuroPrincipal = () => {
  return (
    <>
    <div className="container">
        <div className="row mt-5">
          <div className="col-3 col-sm-3 col-md-3 col-lg-3">
            <LeftPanel />
          </div>
          <div className="col-9 col-sm-9 col-md-9 col-lg-6">
            <CardEventos />
          </div>
          <div className="col-3 col-sm-3 col-md-3 col-lg-3">
            Lateral
          </div>
        </div>
    </div> 
    </>

  );
};

export default MuroPrincipal;
