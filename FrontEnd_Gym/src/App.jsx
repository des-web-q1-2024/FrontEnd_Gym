import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Menu from "./components/pages/Menu";
import { Eventos } from './components/pages/Eventos/Eventos';

const App = () => {
  const [usuario, setUsuario] = useState('');

  const handleLogin = (username) => {
    setUsuario(username);
  };

  return (

    <BrowserRouter>
 
      <main className="main-content">

      <Routes>
       <Route path='/' element={<Login onLogin={handleLogin} />} />
        <Route path="/eventos" element={<Eventos />} />
          <Route path="/menu" element={<Menu />} />
      </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;