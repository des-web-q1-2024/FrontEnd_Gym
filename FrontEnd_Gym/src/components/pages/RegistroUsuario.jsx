import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegistroUsuario = ({ show, handleClose }) => {
  const [registroForm, setRegistroForm] = useState({
    nombre_usuario: '',
    nombre: '',
    apellido: '',
    correo: '',
    contrasenia: '',
    idPerfil: 3, // ID del perfil que quieres asignar (en este caso, 3)
  });

  const handleRegistroChange = (e) => {
    const { name, value } = e.target;
    setRegistroForm({ ...registroForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/registro', registroForm);
      const data = response.data;

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Usuario registrado correctamente',
        });
        handleClose(); // Cierra el modal de registro después de un registro exitoso
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar al usuario',
        });
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombreUsuario">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="nombre_usuario"
              value={registroForm.nombre_usuario}
              onChange={handleRegistroChange}
              placeholder="Ingrese su nombre de usuario"
            />
          </Form.Group>
          {/* Agrega más campos de formulario para el registro */}
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        </Form>
  );
};

export default RegistroUsuario;
