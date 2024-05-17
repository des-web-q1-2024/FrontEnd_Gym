import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const NuevoUsuarioModal = ({ isOpen, onRequestClose, onUsuarioCreado }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [idPerfil, setIdPerfil] = useState('');
  const [perfiles, setPerfiles] = useState([]);

  useEffect(() => {
    cargarPerfiles();
  }, []);

  useEffect(() => {
    generarNombreUsuario();
  }, [nombre, apellido]);

  const cargarPerfiles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/Perfiles');
      setPerfiles(response.data);
    } catch (error) {
      console.error('Error al cargar los perfiles:', error);
    }
  };

  const generarNombreUsuario = () => {
    if (nombre && apellido) {
      setNombreUsuario(`${nombre.charAt(0)}${apellido.substring(0, 4)}`.toLowerCase());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre_usuario', nombreUsuario);
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('correo', correo);
    formData.append('contrasenia', contrasenia);
    formData.append('fechanacimiento', fechaNacimiento);
    if (fotoPerfil) {
      formData.append('fotoPerfil', fotoPerfil);
    }
    formData.append('idPerfil', idPerfil);

    try {
      const response = await axios.post('http://localhost:3000/api/usuarios', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Llamar a la función de actualización de la lista de usuarios
      onUsuarioCreado(response.data);

      // Cerrar el modal
      onRequestClose();
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombreUsuario">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" value={nombreUsuario} readOnly />
          </Form.Group>
          {/* Resto del formulario */}
          <Button variant="primary" type="submit">
            Crear Usuario
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NuevoUsuarioModal;
