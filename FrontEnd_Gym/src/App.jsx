import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Eventos from "./components/pages/Eventos/Eventos.jsx";
import ParticipacionesAlumnos from "./components/pages/Participaciones/ParticipacionesAlumnos.jsx";
import Menu from "./components/pages/Menu.jsx";
import Perfiles from "./components/pages/Perfiles/Perfiles.jsx";
import UsuariosPrincipal from "./components/pages/Usuarios/UsuariosPrincipal.jsx"
const App = () => {
  const [usuario, setUsuario] = useState("");

  const handleLogin = (username) => {
    setUsuario(username);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
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
    </BrowserRouter>
  );
};

export default App;
