import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from './components/pages/Usuarios/UserContext.jsx';
import Login from "./components/Login";
import Eventos from "./components/pages/Eventos/Eventos.jsx";
import ParticipacionesAlumnos from "./components/pages/Participaciones/ParticipacionesAlumnos.jsx";
import Menu from "./components/pages/Menu.jsx";
import Perfiles from "./components/pages/Perfiles/Perfiles.jsx";
import UsuariosPrincipal from "./components/pages/Usuarios/UsuariosPrincipal.jsx";
import LandingPage from "./components/pages/LandingPage";

const App = () => {
  const [usuario, setUsuario] = useState("");
  const [userLogin, setUserLogin] = useState({
    nombre_usuario: "",
    nombre: "",
    correo: "",
    idperfil: 0,
    perfil: ""
  });

  const handleLogin = (username) => {
    setUsuario(username);
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userLogin, setUserLogin }}>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/landing" // Define la ruta '/landing' para mostrar LandingPage
            element={<LandingPage />} // Renderiza LandingPage cuando se accede a '/landing'
          />
          <Route
            path="/*"
            element={
              <>
                <Menu />
                <div className="container mt-5 pt-5">
                  <Routes>
                    <Route path="eventos" element={<Eventos />} />
                    <Route path="perfiles" element={<Perfiles />} />
                    <Route path="ParticipacionesAlumnos" element={<ParticipacionesAlumnos />} />
                    <Route path="usuarios" element={<UsuariosPrincipal />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
