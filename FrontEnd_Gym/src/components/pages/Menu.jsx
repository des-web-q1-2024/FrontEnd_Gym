import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            width="50"
            height="50"
            className="me-2"
          />
          <a className="navbar-brand mb-0 h1" href="#">
            KAHUNA
          </a>
        </div>
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
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
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
              <li className={`nav-item ${location.pathname === "/menu" ? "active" : ""}`}>
                <Link className="nav-link" to="/menu">
                  <BsHouseDoorFill className="me-2" /> Perfiles
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === "/usuarios" ? "active" : ""}`}>
                <Link className="nav-link" to="/usuarios">
                  <BsPersonFill className="me-2" /> Usuarios
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === "/eventos" ? "active" : ""}`}>
                <Link className="nav-link" to="/eventos">
                  <BsCalendar2DateFill className="me-2" /> Eventos
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === "/muro" ? "active" : ""}`}>
                <Link className="nav-link" to="/muro">
                  <BsGearFill className="me-2" /> Muro
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsBoxArrowRight className="me-2" /> Dropdown
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link className="dropdown-item" to="/action">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/another-action">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/something-else">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
