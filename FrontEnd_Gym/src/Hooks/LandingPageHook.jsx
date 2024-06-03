import React, {useState, useContext} from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import UserContext from '../components/pages/Usuarios/UserContext';

const LandingPageHook = () => {
    const { userLogin, setUserLogin } = useContext(UserContext);
    const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [dataForm, setDataForm] = useState({
    user: "",
    pass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const userInfo = async () => {
    try {
      const url = `http://localhost:3000/api/Usuarios/${dataForm.user}`;
      const result = await axios.get(url);
      const resulData = result.data;
      let tempRecord = {
        id: resulData[0].id,
        nombre_usuario: resulData[0].nombre_usuario,
        nombre: resulData[0].nombre,
        correo: resulData[0].correo,
        idperfil: resulData[0].idperfil,
        perfil: resulData[0].perfil,
        foto: resulData[0].foto,
      };
      setUserLogin(tempRecord);
    } catch (error) {
      console.error("Error al obtener información del usuario:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/validarUsuario/${dataForm.user}/${dataForm.pass}`);
      const data = response.data;

      if (data.success) {
        await userInfo();
        setShow(false);
        Swal.fire({
            icon: 'success',
            title: `Bienvenido ${dataForm.user}`,
            text: 'Ingreso exitoso',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
        });
      }
    } catch (e) {
      console.error(e.message);
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al Iniciar Sesión :(',
        text: e.message,
      });
    }
  };

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const openRegisterModal = () => setShowRegister(true);
  const closeRegisterModal = () => setShowRegister(false);

  return {
   show,
   setShow,
   showRegister,
   setShowRegister,
   dataForm,
   setDataForm,
   userLogin,
   setUserLogin,


    openModal,
    closeModal,
    openRegisterModal,
    closeRegisterModal,
    handleSubmit,
    userInfo,
    handleChange
  }
}

export default LandingPageHook

