import React from "react";
//import './Muro.css';
import ThemeSwitcher from "./ThemeSwitcher.jsx";

const LeftPanel = () => {
  return (
    <>
      <nav className="main-menu">
        <div>
          <div className="user-info">
            <img
              src="https://e7.pngegg.com/pngimages/312/283/png-clipart-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-thumbnail.png"
              alt="user"
            />
            <p>Usuario logueado</p>
          </div>
          <ul>
            <li className="nav-item active">
              <a href="#">
                <i className="fa fa-bell nav-icon"></i>
                <span className="nav-text">Notificaciones</span>
              </a>
            </li>
            {/* <li className="nav-item">
                            <a href="#">
                                <i className="fa fa-calendar nav-icon"></i>
                                <span className="nav-text">Guardados</span>
                            </a>
                        </li> */}
            <li className="nav-item">
              <a href="#">
                <i className="fa fa-list nav-icon"></i>
                <span className="nav-text">listas</span>
              </a>
            </li>
          </ul>
        </div>
        <ul>
          <li className="nav-item">
            <a href="#">
              <i className="fa fa-right-from-bracket nav-icon"></i>
              <span className="nav-text">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default LeftPanel;
