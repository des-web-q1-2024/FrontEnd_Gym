import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import React, { useContext } from "react";
import {
  BsAwardFill,
  BsCalendar2DateFill,
  BsFillBookmarkCheckFill,
  BsGearFill,
  BsHouseDoorFill,
  BsMastodon,
  BsPersonArmsUp,
  BsPersonFill,
  BsYinYang,
  BsFillDoorOpenFill,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Menu.css";
import UserContext from "./Usuarios/UserContext";

const Menu = () => {
  const location = useLocation();
  const { userLogin } = useContext(UserContext);
  return (
    <>
      <nav className="navbar navbar-dark fixed-top" style={{ backgroundColor: "darkslategrey" }}>
        <div className="container-fluid" >
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              <img
                src="src/assets/logo.png"
                alt="Logo"
                width="50"
                height="50"
                className="me-2"
              />
              {/* <a className="navbar-brand mb-0 h1" href="#">
                KAHUNA
              </a> */}
              <Link className="navbar-brand mb-0 h1" to="/menu">
                KAHUNA
              </Link>
            </div>

            <div className="d-flex align-items-center ms-auto" >
              {userLogin && (
                <>
                  {userLogin.foto ? (
                    <img
                      src={`data:image/jpeg;base64,${userLogin.foto}`}
                      alt="Foto de Perfil"
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    <img
                      src="src/assets/nousuario.png"
                      alt="Imagen Predeterminada"
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}

                  <span className="navbar-text me-3">
                    {userLogin.nombre} ({userLogin.perfil})
                  </span>
                </>
              )}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar"
                aria-controls="offcanvasDarkNavbar"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div
            className="offcanvas offcanvas-end text-bg-dark "
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header" >
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Menu Principal
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li
                  className={`nav-item ${location.pathname === "/menu" ? "active" : ""
                    }`}
                >
                  <Link className="nav-link" to="/perfiles">
                    <BsHouseDoorFill className="me-2" /> Perfiles
                  </Link>
                </li>
                <li
                  className={`nav-item ${location.pathname === "/usuarios" ? "active" : ""
                    }`}
                >
                  <Link className="nav-link" to="/usuarios">
                    <BsPersonFill className="me-2" /> Usuarios
                  </Link>
                </li>
                <li
                  className={`nav-item ${location.pathname === "/eventos" ? "active" : ""
                    }`}
                >
                  <Link className="nav-link" to="/eventos">
                    <BsCalendar2DateFill className="me-2" /> Eventos
                  </Link>
                </li>
                <li
                  className={`nav-item ${location.pathname === "/ParticipacionesAlumnos"
                    ? "active"
                    : ""
                    }`}
                >
                  <Link className="nav-link" to="/ParticipacionesAlumnos">
                    <BsPersonArmsUp className="me-2" /> Participaciones Alumnos
                  </Link>
                </li>

                <li
                  className={`nav-item ${location.pathname === "/GestionArtesMarciales"
                    ? "active"
                    : ""
                    }`}
                >
                  <Link className="nav-link" to="/GestionArtesMarciales">
                    <BsYinYang className="me-2" /> Gestión de Artes Marciales
                  </Link>
                </li>

                <li
                  className={`nav-item ${location.pathname === "/GestionCintas" ? "active" : ""
                    }`}
                >
                  <Link className="nav-link" to="/GestionCintas">
                    <BsAwardFill className="me-2" /> Gestión de Cintas
                  </Link>
                </li>

                <li
                  className={`nav-item ${location.pathname === "/GestionMatriculas" ? "active" : ""
                    }`}
                >
                  <Link className="nav-link" to="/GestionMatriculas">
                    <BsMastodon className="me-2" /> Gestión de Matriculas
                  </Link>
                </li>

                <li
                  className={`nav-item ${location.pathname === "/GestionCintasAlumnos"
                    ? "active"
                    : ""
                    }`}
                >
                  <Link className="nav-link" to="/GestionCintasAlumnos">
                    <BsFillBookmarkCheckFill className="me-2" /> Gestión de
                    Cintas por Alumno
                  </Link>
                </li>

                <li
                  className={`nav-item ${location.pathname === "/MuroPrincipal" ? "active" : ""
                    }`}
                >
                  <Link className="nav-link" to="/MuroPrincipal">
                    <BsGearFill className="me-2" /> Muro
                  </Link>
                </li>

                <li
                  className={`nav-item ${location.pathname === "/" ? "active" : ""
                    }`}
                >
                  <Link className="nav-link" to="/">
                    <BsFillDoorOpenFill className="me-2" /> Log out
                  </Link>
                </li>
              </ul>
              {/* <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};


export default Menu;
