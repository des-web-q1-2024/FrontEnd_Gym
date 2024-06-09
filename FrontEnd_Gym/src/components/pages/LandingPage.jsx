import React, { useContext, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import CardLanding from "./CardLanding";
import "../../styles/LandingPage.css";
import { Modal, Button, Form } from 'react-bootstrap';
import LandingPageHook from '../../Hooks/LandingPageHook';
import RegistroUsuario from './RegistroUsuario';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LandingPage = () => {

const navigate = useNavigate();

  const { 
    show,
    setShow,
    showRegister,
    setShowRegister,
    dataForm,
    setDataForm,
    userLogin,
    setUserLogin,
    openModal,
    closeModal,
    openRegisterModal,
    closeRegisterModal,
    handleSubmit,
    userInfo,
    getDatos,
    information,
    contactos,
    handleChange 
  } = LandingPageHook();


  /*Funcion para salir de sesion, en el hook de la landing page se verifica para que los usuarios 
  que no tengan una sesion iniciada, puedan entrar igual. */
  const handleLogout = () => {
    localStorage.removeItem('userLogin');
    setUserLogin(null);
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Hasta luego',
    });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userLogin'));
    if (storedUser) {
      setUserLogin(storedUser);
    }
  }, [setUserLogin]);


  const userName = userLogin && userLogin.nombre_usuario ? userLogin.nombre_usuario : null;
  const userProfileId = userLogin && userLogin.idperfil ? userLogin.idperfil : null;

  return (
    <>
      <div className="background"></div>
      <div className="container">
        {!userName ? (
          <div className="container-login text-light" onClick={() => navigate('/IniciarSesion')} style={{ cursor: 'pointer' }}>
            <p className='fs-4 text-end'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle mx-2" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
              </svg>
              Login
            </p>
          </div>
        ) : (
          <div className="container-login text-light" style={{ cursor: 'pointer' }}>
            <p className='fs-4 text-end'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle mx-2" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
              </svg>
              {userName}
              <Button onClick={handleLogout} variant="danger" className="ms-2">Cerrar Sesión</Button>
            </p>
          </div>
        )}

        <div className="card">
          <header className="text-center my-5 text-light">
            <h1 className="display-4">Bienvenido a KAHUNA</h1>
            <p className="lead">Desde 2005 formando jóvenes en diferentes disciplinas como Taekwondo, Karate, Judo y Kickboxing.</p>
          </header>
        </div>

        <section className="about-us text-center my-5 ">
          <h2 className="mb-3">Sobre Nosotros</h2>
          {information.map((reg) => (
            <p key={reg.id} className="fs-5 lead">{reg.nosotros}</p>
          ))}
        </section>

        <div className="">
          <section className="vision-mission text-center my-5 ">
            <h2 className="mb-3">Nuestra Misión y Visión</h2>
            <p><strong>Misión:</strong>{information.map((reg) => (
              <p key={reg.id} className="fs-5 lead">{reg.mision}</p>
            ))} </p>
            <p><strong>Visión:</strong>{information.map((reg) => (
              <p key={reg.id} className="fs-5 lead">{reg.vision}</p>
            ))}</p>
          </section>
        </div>

        <div className="">
          <section className="events my-5 card">
            <h2 className="text-center text-uppercase mt-5 mb-3">Eventos Próximos</h2>
            <div className="row">
              <CardLanding />
            </div>
          </section>
        </div>

        <section className="contact-us text-center my-5">
          <p className="mb-3 fs-5 lead">¿Quieres saber más sobre nosotros o tienes alguna pregunta? </p>
          {contactos.map((cont) => (
            <p key={cont.id}>{cont.nombre} +504 {cont.telefono}</p>
          ))}
        </section>
      </div>

      <Modal className='text-light' style={{ backgroundColor: 'black' }} show={show} onHide={closeModal} backdrop="true" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center fs-3'>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 fs-5" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" name='user' value={dataForm.user} onChange={handleChange} placeholder="Ingrese su usuario" />
            </Form.Group>

            <Form.Group className="mb-3 fs-5" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='pass' value={dataForm.pass} onChange={handleChange} placeholder="Ingrese su contraseña" />
            </Form.Group>
            <Button type='submit' variant="primary">
              Login
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={openRegisterModal}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className='text-light' style={{ backgroundColor: 'black' }} show={showRegister} onHide={closeRegisterModal} backdrop="true" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center fs-3'>Registro de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistroUsuario />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LandingPage;








