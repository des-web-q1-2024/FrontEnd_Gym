import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import UserContext from './components/pages/Usuarios/UserContext.jsx';
import Login from "./components/Login";
import Eventos from "./components/pages/Eventos/Eventos.jsx";
import ParticipacionesAlumnos from "./components/pages/Participaciones/ParticipacionesAlumnos.jsx";
import Menu from "./components/pages/Menu.jsx";
import Perfiles from "./components/pages/Perfiles/Perfiles.jsx";
import UsuariosPrincipal from "./components/pages/Usuarios/UsuariosPrincipal.jsx";
import LandingPage from "./components/pages/LandingPage";
import MuroPrincipal from "./components/pages/Muro/PrincipalMuro.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GestionArtesMarciales } from "./components/pages/cintas/GestionArtesMarciales.jsx";
import { GestionCintas } from "./components/pages/cintas/GestionCintas.jsx";
import { GestionMatriculas } from "./components/pages/cintas/GestionMatriculas.jsx";
import { GestionCintasAlumnos } from "./components/pages/cintas/GestionCintasAlumnos.jsx";
import RegistroUsuario from "./components/pages/RegistroUsuario.jsx";
import { UserProvider } from "./components/pages/Usuarios/UserContext.jsx";

const App = () => {
  const [usuario, setUsuario] = useState("");
  const [userLogin, setUserLogin] = useState({
    nombre_usuario: "",
    nombre: "",
    correo: "",
    idperfil: 0,
    perfil: "",
  });

  const handleLogin = (username) => {
    setUsuario(username);
  };

  return (
    <BrowserRouter>
      <UserProvider>
        {/* <UserContext.Provider value={{ userLogin, setUserLogin }}> */}
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/landing"
            element={<LandingPage onLogin={handleLogin} />}
          />
          <Route path="/muroPrincipal" element={<MuroPrincipal />} />
          <Route path="/registro" element={<RegistroUsuario />} />{" "}
          {/* Agrega la ruta y el componente RegistroUsuario */}
          <Route
            path="/*"
            element={
              <>
                <Menu />
                <div className="container mt-5 pt-5">
                  <Routes>
                    <Route path="eventos" element={<Eventos />} />
                    <Route path="perfiles" element={<Perfiles />} />
                    <Route
                      path="ParticipacionesAlumnos"
                      element={<ParticipacionesAlumnos />}
                    />
                    <Route
                      path="GestionArtesMarciales"
                      element={<GestionArtesMarciales />}
                    />
                    <Route path="GestionCintas" element={<GestionCintas />} />
                    <Route
                      path="GestionMatriculas"
                      element={<GestionMatriculas />}
                    />
                    <Route
                      path="GestionCintasAlumnos"
                      element={<GestionCintasAlumnos />}
                    />
                    <Route path="usuarios" element={<UsuariosPrincipal />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </UserProvider>
      {/* </UserContext.Provider> */}
    </BrowserRouter>
  );
};

export default App;
