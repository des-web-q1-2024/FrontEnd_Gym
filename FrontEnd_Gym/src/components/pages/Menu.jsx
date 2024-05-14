import React from "react";
import "../../styles/Menu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BsHouseDoorFill,
  BsPersonFill,
  BsGearFill,
  BsBoxArrowRight,
} from "react-icons/bs";

const Menu = () => {
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <div className="icon">
            <img src="src\assets\logo.png" alt="Logo" width="70" height="70" />
          </div>

          <div className="logo_name mt-2">KAHUNA</div>
        </div>
        <ul className="nav-list">
          <li>
            <a href="#">
              <BsHouseDoorFill className="icon" />
              <span className="links_name">Perfiles</span>
            </a>
          </li>
          <li>
            <a href="#">
              <BsPersonFill className="icon" />
              <span className="links_name">Usuarios</span>
            </a>
          </li>
          <li>
            <a href="#">
              <BsGearFill className="icon" />
              <span className="links_name">Muro</span>
            </a>
          </li>
          <li>
            <a href="#">
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
    </>
  );
};

export default Menu;
