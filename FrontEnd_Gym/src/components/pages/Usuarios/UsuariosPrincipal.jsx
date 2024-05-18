import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap'; 
import ListaUsuarios from './ListaUsuarios';
import DetalleUsuario from './DetalleUsuario';
import NuevoUsuarioModal from './NuevoUsuarioModal';
import { BsPlusCircle } from "react-icons/bs";

const UsuariosPrincipal = () => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const handleUsuarioSeleccionado = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  const handleNuevoUsuarioCreado = (nuevoUsuario) => {
 
    cargarUsuarios();
    console.log('Nuevo usuario creado:', nuevoUsuario);
  };

  const handleUsuarioEliminado = (idUsuarioEliminado) => {
 
    const nuevosUsuarios = usuarios.filter(usuario => usuario.id !== idUsuarioEliminado);
    setUsuarios(nuevosUsuarios);
  };

  const cargarUsuarios = async () => {
    try {
      const response = await fetch('URL_DEL_API');
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        console.error('Error al cargar los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };

  return (
    <div className="container py-4"> 
      <Button variant="warning" onClick={() => setModalVisible(true)}>
        <BsPlusCircle className="me-2" />Nuevo Usuario
      </Button>

      <Row className="mt-4"> 
        <Col md={6}> 
          <ListaUsuarios onUsuarioSeleccionado={handleUsuarioSeleccionado} />
        </Col>
        <Col md={6}> 
          <DetalleUsuario usuario={usuarioSeleccionado} onUsuarioEliminado={handleUsuarioEliminado} />
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