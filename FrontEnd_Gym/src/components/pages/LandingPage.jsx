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






