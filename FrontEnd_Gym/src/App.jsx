import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/pages/Menu.jsx";
import Eventos from "./components/pages/Eventos/Eventos.jsx";

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
