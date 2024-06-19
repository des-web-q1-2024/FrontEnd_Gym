import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import CardLanding from "./CardLanding";
import '../LandingConfig/LandingPage.css'
import { Button } from 'react-bootstrap';
import LandingPageHook from '../../../Hooks/LandingPageHook';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

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

  const navegar = () => {
    if (userLogin && (userLogin.id === 3 || userLogin.id === 2)){
      navigate('/menu');
    } 
  }

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
              <span onClick={() => navegar()} className='btn' style={{cursor: 'pointer'}}>{userName}</span> 
              <Button onClick={handleLogout} variant="danger" className="ms-2">Cerrar Sesión</Button>
            </p>
          </div>
        )}

        <div className="">
          <header className="text-center my-5 text-light ">
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
              <span key={reg.id} className="fs-5 lead">{reg.mision}</span>
            ))} </p>
            <p><strong>Visión:</strong>{information.map((reg) => (
              <span key={reg.id} className="fs-5 lead">{reg.vision}</span>
            ))}</p>
          </section>
        </div>

        <div className="">
          <section className="events my-5">
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
          <div className="socialMedias" >
            <Link to={'https://www.instagram.com/mmakahunacenter/'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;








