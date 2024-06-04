import React, { useContext } from "react";
import UserContext from "../Usuarios/UserContext";
import { Link } from "react-router-dom";
const LeftPanel = ({ handleItemClick }) => {
  const { userLogin } = useContext(UserContext);
  return (
    <>
      <nav className="main-menu">
        <div>
          <div className="user-info">
          {userLogin.foto ? (
            <img
              src={`data:image/jpeg;base64,${userLogin.foto}`}
              alt="Foto de Perfil"
              className="rounded-circle mr-3"
              style={{ width: "200px", height: "200px" }}
            />
          ) : (
            <img
              src="src\assets\nousuario.png"
              alt="Imagen Predeterminada"
              className="rounded-circle mr-3"
              style={{ width: "200px", height: "200px" }}
            />
          )}
            <p>{userLogin.nombre}</p>
          </div>
          <ul>
            <li className="nav-item">
              <a href="#" onClick={() => handleItemClick("Publicaciones")}>
                <i className="fa fa-bullhorn nav-icon"></i>
                <span className="nav-text">Publicaciones</span>
              </a>
            </li>
            <li className="nav-item active">
              <a href="#" >
                <i className="fa fa-bell nav-icon"></i>
                <span className="nav-text">Notificaciones</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" onClick={() => handleItemClick("Eventos")}>
                <i className="fa fa-calendar nav-icon"></i>
                <span className="nav-text">Eventos</span>
              </a>
            </li>
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
            <Link to="/landing">
              <i className="fa fa-right-from-bracket nav-icon"></i>
              <span className="nav-text">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default LeftPanel;
