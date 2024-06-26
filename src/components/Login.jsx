import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginStyles from "../styles/LoginStyles";
import UserContext from './pages/Usuarios/UserContext';

function Login({ onLogin }) {
  const { userLogin, setUserLogin } = useContext(UserContext);

  const showAlert = (icon, title, text) => {
    Swal.fire({ icon, title, text, });
  };

  const [dataForm, setDataForm] = useState({
    nombre_usuario: "",
    pass: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dataForm.nombre_usuario || !dataForm.pass) {
      showAlert("error", "Error", "Por favor, complete todos los campos");
      return;
    }

    try {
      // const response = await axios.get(
      //   `http://localhost:3000/api/validarUsuario/${dataForm.nombre_usuario}/${dataForm.pass}`
      // );
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/validarUsuario/${dataForm.nombre_usuario}/${dataForm.pass}`);
      const data = response.data;

      if (data.success) {
        handleGlobalUser();
      } else {
        showAlert("error", "Error", "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      const errorMessage = error.response?.data?.message || "Hubo un error al iniciar sesión";
      showAlert("error", "Error", errorMessage);
    }
  };

  const handleGlobalUser = async () => {
    try {
      const url = `${import.meta.env.VITE_URL}/api/Usuarios/${dataForm.nombre_usuario}`;
      const result = axios.get(url);
      const resulData = (await result).data;
      let tempRecord = {
        id: resulData[0].id,
        nombre_usuario: resulData[0].nombre_usuario,
        nombre: resulData[0].nombre,
        correo: resulData[0].correo,
        idperfil: resulData[0].idperfil,
        perfil: resulData[0].perfil,
        foto: resulData[0].foto
      }
      setUserLogin(tempRecord);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  /*Funcion para verificar el idperfil del usuario y dirigirlo a sitios distintos */
  useEffect(() => {
    if (userLogin) {
      if (userLogin.idperfil === 3) {
        navigate("/MuroPrincipal");
      } else if (userLogin.idperfil === 1 || userLogin.idperfil === 2) {
        navigate("/menu");
      }
    }
  }, [userLogin, navigate]);

  return (
    <div className="container-fluit login-container">
      <LoginStyles />
      <div className="card mx-auto login-card">
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre_usuario" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre_usuario"
              name="nombre_usuario"
              value={dataForm.nombre_usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="pass"
              name="pass"
              value={dataForm.pass}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
