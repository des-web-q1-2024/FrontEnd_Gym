import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../../../styles/Modal.css";
import axios from 'axios';

const NuevoUsuarioModal = ({ isOpen, onRequestClose, onUsuarioCreado, setConteoModal, conteModal }) => {
  // Estados para los campos del formulario
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [idPerfil, setIdPerfil] = useState('');
  const [perfiles, setPerfiles] = useState([]);

  // Cargar perfiles al montar el componente
  useEffect(() => {
    cargarPerfiles();
  }, []);

  // Generar nombre de usuario cuando cambian el nombre o el apellido
  useEffect(() => {
    generarNombreUsuario();
  }, [nombre, apellido]);

  // Función para cargar perfiles desde la API
  const cargarPerfiles = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/Perfiles`);
      setPerfiles(response.data);
    } catch (error) {
      console.error('Error al cargar los perfiles:', error);
    }
  };

  // Función para generar el nombre de usuario automáticamente
  const generarNombreUsuario = () => {
    if (nombre && apellido) {
      setNombreUsuario(`${nombre.charAt(0)}${apellido.substring(0, 4)}`.toLowerCase());
    }
  };

  // Función para manejar el envío del formulario
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
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/usuarios`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setConteoModal(conteModal + 1); // Actualiza el conteo de modales
      onUsuarioCreado(response.data); // Notifica al componente padre sobre la creación del nuevo usuario
      onRequestClose(); // Cierra el modal
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: 'white' }} className="custom-modal-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombreUsuario">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" value={nombreUsuario} readOnly />
          </Form.Group>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formContrasenia">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formFechaNacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formFotoPerfil">
            <Form.Label>Foto de Perfil</Form.Label>
            <Form.Control type="file" onChange={(e) => setFotoPerfil(e.target.files[0])} />
          </Form.Group>
          <Form.Group controlId="formPerfil">
            <Form.Label>Perfil</Form.Label>
            <Form.Control as="select" value={idPerfil} onChange={(e) => setIdPerfil(e.target.value)}>
              <option value="">Seleccione un perfil</option>
              {perfiles.map((perfil) => (
                <option key={perfil.id} value={perfil.id}>
                  {perfil.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear Usuario
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NuevoUsuarioModal;
