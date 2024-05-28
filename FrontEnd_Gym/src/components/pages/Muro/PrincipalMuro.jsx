import React from 'react';
import LeftPanel from './LeftPanel';
import './Muro.css';

const MuroPrincipal = () => {
  return (
    <div className="row mt-5">
      <div className="col-3">
        <LeftPanel />
      </div>
      <div className="col">
        hola
      </div>
      <div className="col">
        hola
      </div>
    </div>
  );
};

export default MuroPrincipal;
