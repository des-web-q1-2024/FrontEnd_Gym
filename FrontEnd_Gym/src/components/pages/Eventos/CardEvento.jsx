import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

export const CardEvento = () => {
  
  const [data, setData] = useState([])

  const getDatos = async () =>{
    const url = 'http://localhost:3000/api/evento'
    const response = await axios.get(url)
    setData(response.data)
    console.log(response.data)
  }

  useEffect(()=>{
    getDatos()
  },[])

  return (
    <>
     {
      data.map((evento)=>(
        <div key={evento.id} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div className="card bg-eventos" style={{ width: "18rem;" }}>
            <img
              src={`data:${evento.mime_type};base64,${evento.foto}`} 
              className="card-img-top"
              alt="evento"
            />
            <div className="card-body">
              <h6 className="card-title text-white ff-inter">
               {evento.nombre}
              </h6>
              <p className='text-white ff-inter fs-8'>{evento.descripcion}</p>
              <span className="fecha-evento ff-inter">{evento.fecha}</span>
            </div>
          </div>
        </div>
      ))
     }
    </>
  )
}
