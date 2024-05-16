import React from "react";
import "../../styles/Menu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import {
  BsHouseDoorFill,
  BsPersonFill,
  BsGearFill,
  BsBoxArrowRight,
  BsCalendar2DateFill,
} from "react-icons/bs";

const Menu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-transparent ">
        <div className="container-fluid">
          <div className="logo-details">
            <div className="icon">
              <img
                src="src/assets/logo.png"
                alt="Logo"
                width="70"
                height="70"
              />
            </div>
            <div className="logo_name mt-2">KAHUNA</div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="sidebar collapse navbar-collapse" id="navbarNav">
            <ul className="nav-list flex-column">
              <li>
                <a href="/menu">
                  <BsHouseDoorFill className="icon" />
                  <span className="links_name active">Perfiles</span>
                </a>
              </li>
              <li>
                <a href="/menu">
                  <BsPersonFill className="icon" />
                  <span className="links_name">Usuarios</span>
                </a>
              </li>
              <li>
                <a href="/eventos">
                  <BsCalendar2DateFill className="icon" />
                  <span className="links_name">Eventos</span>
                </a>
              </li>
              <li>
                <a href="/menu">
                  <BsGearFill className="icon" />
                  <span className="links_name">Muro</span>
                </a>
              </li>
              <li>
                <a href="/menu">
                  <BsBoxArrowRight className="icon" />
                  <span className="links_name">Cerrar Sesión</span>
                </a>
              </li>
            </ul>
            <div className="profile">
              <div className="profile-details">
                <img
                  src="https://banner2.cleanpng.com/20180623/bep/kisspng-computer-icons-source-code-program-optimization-ic-optimize-5b2e179603d737.7219212315297473500158.jpg"
                  alt="avatar"
                />
                <div className="name-job">
                  <div className="name">Desarrollo Web 2</div>
                  <div className="job">Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
