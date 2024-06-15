import React, {useState, useEffect} from 'react'
import LandingPageHook from '../../../Hooks/LandingPageHook'
import '../LandingConfig/LandingPage.css'

export const LandingConfig = () => {

  const { information, contactos } = LandingPageHook();

  const [dataForm, setDataForm] = useState({
    nosotros: information[0]?.nosotros || '',
    mision: information[0]?.mision || '',
    vision: information[0]?.vision || ''
  });

  const onChange = (event) => {
     const {name, value} = event.target;
     setDataForm((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
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
            <p className='fs-3 text-bold'>Lista de Contactos actuales</p>
            {contactos.map((contact) => (
              <p key={contact.id}>{contact.nombre} - {contact.telefono}</p>
            ))}
            <button className='btn btn-outline btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
          </div>

        ))}
      </section>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Editar</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {information.map((item) => (
                <form key={item.id}>
                  <label  class="form-label">Nosotros:</label>
                  <textarea type="text" class="form-control" placeholder={item.nosotros} onChange={onChange} name='nosotros' style={{height: '100px'}} />
                  <label  class="form-label">Mision:</label>
                  <textarea type="text" class="form-control" placeholder={item.mision} name='mision' onChange={onChange} style={{height: '100px'}} />
                  <label  class="form-label">Vision:</label>
                  <textarea type="text" class="form-control" placeholder={item.vision} name='vision' onChange={onChange} style={{height: '100px'}} />
                </form>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
