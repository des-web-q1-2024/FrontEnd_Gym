import React, { useState, useEffect } from 'react'
import LandingPageHook from '../../../Hooks/LandingPageHook'
import '../LandingConfig/LandingPage.css'
import axios from 'axios'

export const LandingConfig = () => {

  const { information, contactos } = LandingPageHook();

  const [dataForm, setDataForm] = useState({
    nosotros: '',
    mision: '',
    vision: ''
  });

  const [contactData, setContactData] = useState({
    id: '',
    nombre: '',
    telefono: ''
  });

  const [showContacts, setShowContacts] = useState(false);
  const [editar, setEditar] = useState('landing');

  const onChange = (event) => {
    const { name, value } = event.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const onContactChange = (event) => {
    const { name, value } = event.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpd = async (e) => {
    // Llamada a la api para poder actualizar
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/api/Landing/'
      const response = await axios.put(url, dataForm);
      location.reload();
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleUpdContacts = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3000/api/Landing/${contactData.id}`
      const response = await axios.put(url, contactData);
      location.reload();
    } catch (error) {
      console.error(error.message)
    }
  }

  const tableContactos = () => {
    if (showContacts) {
      return (
        <div>
          <h1 className='fs-3 text-uppercase'>Tabla de Contactos</h1>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.nombre}</td>
                  <td>{contact.telefono}</td>
                  <td>
                    <button
                      className='btn btn-outline btn-warning'
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setEditar('contact');
                        setContactData({id: contact.id ,nombre: contact.nombre, telefono: contact.telefono });
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='btn btn-danger' onClick={() => setShowContacts(false)}>Cerrar Tabla</button>
        </div>
      );
    } else ( 
      <></>
    )
  }


  return (
    <>
      <section>
        <p className='text-uppercase fs-1 text-center'>Editar Informacion</p>
        {information.map((item) => (
          <div className='container' key={item.id}>
            <p className='fs-3 text-bold'>Nosotros Actual: </p>
            <p>{item.nosotros}</p>
            <p className='fs-3 text-bold'>Mision Actual: </p>
            <p>{item.mision}</p>
            <p className='fs-3 text-bold'>Vision Actual: </p>
            <p>{item.vision}</p>
            <button
              className='btn btn-outline btn-success'
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setEditar('landing')}
            >
              Editar Informacion
            </button>
            <button className='btn btn-outline-primary mx-4' onClick={() => {setShowContacts(true); setDataForm({nosotros: item.nosotros, mision: item.mision, vision: item.vision})}}>Mostrar Contactos</button>
          </div>

        ))}
      </section>

      <section>
        {tableContactos()}
      </section>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Editar</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {editar === 'landing' ?
                (
                  <form>
                    <label className="form-label">Nosotros:</label>
                    <textarea type="text" className="form-control" value={dataForm.nosotros} onChange={onChange} name='nosotros' style={{ height: '100px' }} />
                    <label className="form-label">Mision:</label>
                    <textarea type="text" className="form-control" value={dataForm.mision} name='mision' onChange={onChange} style={{ height: '100px' }} />
                    <label className="form-label">Vision:</label>
                    <textarea type="text" className="form-control" value={dataForm.vision} name='vision' onChange={onChange} style={{ height: '100px' }} />
                  </form>
                ) :
                (
                  <form>
                    <label className="form-label">Nombre:</label>
                    <input type="text" className="form-control" value={contactData.nombre} onChange={onContactChange} name='nombre' />
                    <label className="form-label">Teléfono:</label>
                    <input type="text" className="form-control" value={contactData.telefono} onChange={onContactChange} name='telefono' />
                  </form>
                )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button 
                type="button" 
                className="btn btn-warning" 
                onClick={editar === 'landing' ? handleUpd : handleUpdContacts}

              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
