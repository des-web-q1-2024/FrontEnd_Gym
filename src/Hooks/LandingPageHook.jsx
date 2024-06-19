import React, {useState, useContext, useEffect} from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../components/pages/Usuarios/UserContext';

const LandingPageHook = () => {
  /* Llamamos al usuario y sus datos mediante el useContext*/
    const { userLogin, setUserLogin } = useContext(UserContext);
    const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [information, setInformation] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [dataForm, setDataForm] = useState({
    user: "",
    pass: "",
  });

  const navigate = useNavigate();

  /*Funcion para poder manejar los estados de los inputs */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };


  /*Funcion para poder llamar al endPoint de getUsuarios mediante su userName y asi tener todos sus datos de la base de datos */
  const userInfo = async () => {
    try {
      const url = `${import.meta.env.VITE_URL}/api/Usuarios/${dataForm.user}`;
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
      console.log(tempRecord)
    } catch (error) {
      console.error("Error al obtener información del usuario:", error);
    }
  };

  const getDatos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/Landing/`);
      const data = response.data
      setInformation(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const getContactos = async () => {
    try {
      
    const response = await axios.get(`${import.meta.env.VITE_URL}/api/Landing/contactos`);
    const data = response.data;
    setContactos(data);
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getDatos();
    getContactos();
   }, [])


  /*Funcion para validar si el usuario y contraseña son validos */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/validarUsuario/${dataForm.user}/${dataForm.pass}`);
      const data = response.data;
        console.log(response.data)
      if (data.success) {
        await userInfo();
        setShow(false);
        Swal.fire({
            icon: 'success',
            title: `Bienvenido ${dataForm.user}`,
            text: 'Ingreso exitoso',
        });
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


  

  /*Funciones para manejar los estados booleanos de los modales */
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
   information,
   contactos,


    openModal,
    closeModal,
    openRegisterModal,
    closeRegisterModal,
    handleSubmit,
    userInfo,
    handleChange, 
    getDatos,
  }
}

export default LandingPageHook

