// src/components/pages/LandingPage.jsx
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import CardLanding from "./CardLanding";
import "../../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <div className="background"></div>
      <div className="container">

      <div className="container-login">
          <p className='fs-4 text-end'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle mx-2" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>
          Login
          </p>
        </div>

        <header className="text-center my-5">
          <h1 className="display-4">Bienvenido a KAHUNA</h1>
          <p className="lead">Desde 2005 formando jóvenes en diferentes disciplinas como Taekwondo, Karate, Judo y Kickboxing.</p>
        </header>

        <section className="about-us text-center my-5">
          <h2 className="mb-3">Sobre Nosotros</h2>
          <p>Somos Kahuna, una escuela de artes marciales dedicada a formar jóvenes en diferentes disciplinas desde 2005. Ofrecemos clases de Taekwondo, Karate, Judo y Kickboxing.</p>
        </section>

        <section className="vision-mission text-center my-5">
          <h2 className="mb-3">Nuestra Misión y Visión</h2>
          <p><strong>Misión:</strong> [Aquí va la misión de la escuela]</p>
          <p><strong>Visión:</strong> [Aquí va la visión de la escuela]</p>
        </section>

        <section className="events my-5">
          <h2 className="text-center text-uppercase mb-3">Eventos Proximos</h2>
          <div className="row">
            <CardLanding />
          </div>
        </section>

        <section className="contact-us text-center my-5">
          <h2 className="mb-3">Contáctanos</h2>
          <p>Elvin Cruz: +504 8922-1317</p>
          <p>Marina Sifontes: +504 3176-7371</p>
        </section>
      </div>
    </>
  );
};

export default LandingPage;






