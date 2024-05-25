import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap'; 
import ListaUsuarios from './ListaUsuarios';
import DetalleUsuario from './DetalleUsuario';
import NuevoUsuarioModal from './NuevoUsuarioModal';
import { BsPlusCircle } from "react-icons/bs";

const UsuariosPrincipal = () => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [conteModal, setConteoModal] = useState(0);

  const handleUsuarioSeleccionado = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  const handleNuevoUsuarioCreado = (nuevoUsuario) => {
    console.log('Nuevo usuario creado:', nuevoUsuario);
  };

  return (
    <div className="container py-4"> 
      <Button variant="warning" onClick={() => setModalVisible(true)}>
        <BsPlusCircle className="me-2" />Nuevo Usuario
      </Button>

      <Row className="mt-4"> 
        <Col md={6}> 
          <ListaUsuarios onUsuarioSeleccionado={handleUsuarioSeleccionado}  conteModal={conteModal} />
        </Col>
        <Col md={6}> 
          <DetalleUsuario usuario={usuarioSeleccionado} onUsuarioEliminado={()=> 1+1 } />
        </Col>
      </Row>

      <NuevoUsuarioModal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onUsuarioCreado={handleNuevoUsuarioCreado} 
        setConteoModal = {setConteoModal}
        conteModal={conteModal}
      />
    </div>
  );
};

export default UsuariosPrincipal;