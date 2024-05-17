import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap'; 
import ListaUsuarios from './ListaUsuarios';
import DetalleUsuario from './DetalleUsuario';
import NuevoUsuarioModal from './NuevoUsuarioModal';
import { BsPlusCircle } from "react-icons/bs";

const UsuariosPrincipal = () => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };

  const handleUsuarioSeleccionado = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  const handleNuevoUsuarioCreado = async (nuevoUsuario) => {
    console.log('Nuevo usuario creado:', nuevoUsuario);
    // Actualizar la lista de usuarios
    await cargarUsuarios();
    // Cerrar el modal
    setModalVisible(false);
  };

  return (
    <div className="container py-4"> 
      <Button variant="warning" onClick={() => setModalVisible(true)}>
        <BsPlusCircle className="me-2" />Nuevo Usuario
      </Button>

      <Row className="mt-4"> 
        <Col md={6}> 
          <ListaUsuarios usuarios={usuarios} onUsuarioSeleccionado={handleUsuarioSeleccionado} />
        </Col>
        <Col md={6}> 
          <DetalleUsuario usuario={usuarioSeleccionado} />
        </Col>
      </Row>

      <NuevoUsuarioModal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onUsuarioCreado={handleNuevoUsuarioCreado}
      />
    </div>
  );
};

export default UsuariosPrincipal;
