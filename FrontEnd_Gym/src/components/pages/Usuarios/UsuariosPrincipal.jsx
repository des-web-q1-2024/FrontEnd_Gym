import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap'; 
import ListaUsuarios from './ListaUsuarios';
import DetalleUsuario from './DetalleUsuario';
import NuevoUsuarioModal from './NuevoUsuarioModal';
import { BsPlusCircle } from "react-icons/bs";

const UsuariosPrincipal = () => {
  // Estado para el usuario seleccionado
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);
  // Estado para controlar el conteo de modales y actualizar la lista
  const [conteModal, setConteoModal] = useState(0);

  // Maneja la selección de un usuario
  const handleUsuarioSeleccionado = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  // Maneja la creación de un nuevo usuario (actualmente solo imprime en consola)
  const handleNuevoUsuarioCreado = (nuevoUsuario) => {
    console.log('Nuevo usuario creado:', nuevoUsuario);
    setConteoModal(conteModal + 1); // Incrementa el conteo para actualizar la lista de usuarios
  };

  // Maneja la eliminación de un usuario y actualiza el estado
  const handleUsuarioEliminado = (idUsuario) => {
    if (usuarioSeleccionado && usuarioSeleccionado.id === idUsuario) {
      setUsuarioSeleccionado(null);
    }
    setConteoModal(conteModal + 1); // Incrementa el conteo para actualizar la lista de usuarios
  };

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
