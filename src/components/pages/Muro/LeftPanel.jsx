import { useState, useContext, useEffect } from "react";
import UserContext from "../Usuarios/UserContext";
import { Link } from "react-router-dom";

const LeftPanel = ({ handleItemClick }) => {
  const { userLogin } = useContext(UserContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleNavItemClick = (index, action) => {
    setActiveIndex(index);
    if (action) action();
  };

  useEffect(() => {
    console.log(userLogin);
  }, [])

  return (
    <>
      <nav className="main-menu text-white-50">
        <div>
          <div className="user-info">
            {userLogin.foto ? (
              <img
                src={`data:image/jpeg;base64,${userLogin.foto}`}
                alt="Foto de Perfil"
                className="rounded-circle mr-3"
                style={{ width: "100px", height: "100px", objectFit: "fill", marginLeft: "16px" }}
              />
            ) : (
              <img
                src="src\assets\nousuario.png"
                alt="Imagen Predeterminada"
                className="rounded-circle mr-3"
                style={{ width: "100px", height: "100px", objectFit: "fill", marginLeft: "16px" }}
              />
            )}
            <p>{userLogin.nombre}</p>
          </div>

          { (userLogin.perfil == "admin" || userLogin.perfil == "maestro") ? (
            <ul>
              <li className="nav-item mb-5">
                <Link to="/menu">
                  <i className="fa fa-home fa-fw nav-icon"></i>
                  <span className="nav-text ms-3">Menú Prinicpal</span>
                </Link>
              </li>
            </ul>
          ): (<></>)}
          <ul>
            <li className={`nav-item ${activeIndex === 0 ? "active" : ""}`}>
              <a href="#" onClick={() => handleNavItemClick(0, () => handleItemClick("Publicaciones"))}>
                <i className="fa fa-bullhorn nav-icon"></i>
                <span className="nav-text">Publicaciones</span>
              </a>
            </li>
            <li className={`nav-item ${activeIndex === 1 ? "active" : ""}`}>
              <a href="#" onClick={() => handleNavItemClick(1)}>
                <i className="fa fa-bell nav-icon"></i>
                <span className="nav-text">Notificaciones</span>
              </a>
            </li>
            <li className={`nav-item ${activeIndex === 2 ? "active" : ""}`}>
              <a href="#" onClick={() => handleNavItemClick(2, () => handleItemClick("Eventos"))}>
                <i className="fa fa-calendar nav-icon"></i>
                <span className="nav-text">Eventos</span>
              </a>
            </li>
            <li className={`nav-item ${activeIndex === 3 ? "active" : ""}`}>
              <a href="#" onClick={() => handleNavItemClick(3)}>
                <i className="fa fa-list nav-icon"></i>
                <span className="nav-text">listas</span>
              </a>
            </li>
          </ul>
        </div>
        <ul>
          <li className="nav-item">
            <Link to="/">
              <i className="fa fa-right-from-bracket nav-icon"></i>
              <span className="nav-text">Landing Page</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default LeftPanel;
