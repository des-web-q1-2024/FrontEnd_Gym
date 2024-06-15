import React from 'react';
import { Button, Row, Col } from 'react-bootstrap'; 
import ListaUsuarios from './ListaUsuarios';
import DetalleUsuario from './DetalleUsuario';
import NuevoUsuarioModal from './NuevoUsuarioModal';
import { BsPlusCircle } from "react-icons/bs";
import { UsuariosPrincipalHook } from '../../../Hooks/UsuariosPrincipalHook';

const UsuariosPrincipal = () => {
  

  const { 
        usuarioSeleccionado,
        modalVisible, 
        conteModal,
        setConteoModal,
        handleNuevoUsuarioCreado, 
        handleUsuarioSeleccionado, 
        handleUsuarioEliminado,
        setModalVisible
      } = UsuariosPrincipalHook();

  return (
    <div className="container py-4"> 
      {/* Botón para abrir el modal de nuevo usuario */}
      <Button variant="warning" onClick={() => setModalVisible(true)}>
        <BsPlusCircle className="me-2" />Nuevo Usuario
      </Button>

      <Row className="mt-4"> 
        <Col md={6}> 
          {/* Componente para listar usuarios */}
          <ListaUsuarios onUsuarioSeleccionado={handleUsuarioSeleccionado} conteModal={conteModal} />
        </Col>
        <Col md={6}> 
          {/* Componente para mostrar detalles del usuario seleccionado */}
          <DetalleUsuario usuario={usuarioSeleccionado} onUsuarioEliminado={handleUsuarioEliminado} />
        </Col>
      </Row>

      {/* Modal para crear un nuevo usuario */}
      <NuevoUsuarioModal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onUsuarioCreado={handleNuevoUsuarioCreado} 
        setConteoModal={setConteoModal}
        conteModal={conteModal}
      />
    </div>
  );
};

export default UsuariosPrincipal;
