import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegistroUsuario = ({ show, handleClose }) => {
  const [registroForm, setRegistroForm] = useState({
    nombre_usuario: '',
    nombre: '',
    apellido: '',
    correo: '',
    contrasenia: '',
    fechanacimiento: '',
    fotoPerfil: null,
    idPerfil: 3,
  });

  const handleRegistroChange = (e) => {
    const { name, value } = e.target;
    setRegistroForm({ ...registroForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setRegistroForm({ ...registroForm, fotoPerfil: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre_usuario', registroForm.nombre_usuario);
    formData.append('nombre', registroForm.nombre);
    formData.append('apellido', registroForm.apellido);
    formData.append('correo', registroForm.correo);
    formData.append('contrasenia', registroForm.contrasenia);
    formData.append('fechanacimiento', registroForm.fechanacimiento);
    formData.append('fotoPerfil', registroForm.fotoPerfil);
    formData.append('idPerfil', registroForm.idPerfil);

    try {
      const response = await axios.post('http://localhost:3000/api/registro', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Usuario registrado correctamente',
        });
        handleClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar al usuario',
        });
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema con el registro',
      });
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
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={registroForm.nombre}
          onChange={handleRegistroChange}
          placeholder="Ingrese su nombre"
        />
      </Form.Group>
      <Form.Group controlId="formApellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          name="apellido"
          value={registroForm.apellido}
          onChange={handleRegistroChange}
          placeholder="Ingrese su apellido"
        />
      </Form.Group>
      <Form.Group controlId="formCorreo">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          name="correo"
          value={registroForm.correo}
          onChange={handleRegistroChange}
          placeholder="Ingrese su correo electrónico"
        />
      </Form.Group>
      <Form.Group controlId="formContrasenia">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="contrasenia"
          value={registroForm.contrasenia}
          onChange={handleRegistroChange}
          placeholder="Ingrese su contraseña"
        />
      </Form.Group>
      <Form.Group controlId="formFechaNacimiento">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="fechanacimiento"
          value={registroForm.fechanacimiento}
          onChange={handleRegistroChange}
        />
      </Form.Group>
      <Form.Group controlId="formFotoPerfil">
        <Form.Label>Foto de Perfil</Form.Label>
        <Form.Control
          type="file"
          name="fotoPerfil"
          onChange={handleFileChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    </Form>
  );
};

export default RegistroUsuario;




