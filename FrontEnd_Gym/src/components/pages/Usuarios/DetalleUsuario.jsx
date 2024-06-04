import React from 'react';
import axios from 'axios'; 
import { FaTrashAlt } from "react-icons/fa"; 

const DetalleUsuario = ({ usuario, onUsuarioEliminado }) => {
  // Maneja la eliminación del usuario
  const handleEliminarUsuario = async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    try {
      const response = await axios.delete(`http://localhost:3000/api/usuarios/${usuario.id}`);
      if (response.status === 200) {
        // Llama a la función pasada por props para actualizar la lista de usuarios en el componente padre
        onUsuarioEliminado(usuario.id);
      } else {
        console.error('Error al eliminar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const estiloFormulario = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    color: 'white', 
    padding: '20px',
    borderRadius: '10px', 
    maxWidth: '300px', 
    margin: '0 auto', 
    marginTop: '20px', 
    position: 'relative', 
  };

  return (
    <div>
      {usuario && (
        <div style={estiloFormulario}>
          {usuario.foto ? (
            <img
              src={`data:image/jpeg;base64,${usuario.foto}`}
              alt="Foto de Perfil"
              className="rounded-circle mr-3"
              style={{ width: "200px", height: "200px" }}
            />
          ) : (
            <img
              src="src\assets\nousuario.png"  
              alt="Imagen Predeterminada"
              className="rounded-circle mr-3"
              style={{ width: "200px", height: "200px" }}
            />
          )}
          <p>Nombre: {usuario.nombre}</p>
          <p>Apellido: {usuario.apellido}</p>
          <p>Correo: {usuario.correo}</p>
          <p>Fecha de Nacimiento: {usuario.fechaNacimiento}</p>
          <a href="#" onClick={handleEliminarUsuario} style={{ color: 'red' }}>
            <FaTrashAlt />
          </a>
        </div>
      )}
    </div>
  );
};

export default DetalleUsuario;
