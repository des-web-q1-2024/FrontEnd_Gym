import React, { useState, useEffect } from "react";
import axios from "axios";
import DetalleUsuario from "./DetalleUsuario";

const ListaUsuarios = ({ onUsuarioSeleccionado, conteModal }) => {
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  
  // Estado para manejar el loader
  const [loading, setLoading] = useState(false);

  // useEffect se ejecuta cuando el componente se monta y cuando conteModal cambia
  useEffect(() => {
    cargarUsuarios(); // Carga los usuarios cuando el componente se monta o conteModal cambia
    console.log(conteModal);
  }, [conteModal]);

  // Función para cargar usuarios desde la API
  const cargarUsuarios = async () => {
    setLoading(true); // Mostrar loader antes de iniciar la carga
    try {
      const response = await axios.get("http://localhost:3000/api/usuarios");
      setUsuarios(response.data); // Guardar los usuarios en el estado
    } catch (error) {
      console.error("Error al cargar los usuarios:", error); // Manejo de errores
    } finally {
      setLoading(false); // Ocultar loader después de la carga (ya sea exitosa o con error)
    }
  };

  // Función para eliminar un usuario
  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id)); // Actualizar el estado eliminando el usuario
  };

  return (
    <div className="container">
      <h2 className="mt-4 text-white">Lista de Usuarios</h2>
      {loading ? (
        // Mostrar spinner de carga cuando loading es true
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        // Mostrar la lista de usuarios cuando loading es false
        <div className="list-group">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
              <div onClick={() => onUsuarioSeleccionado(usuario)} className="d-flex align-items-center">
                {/* Mostrar la foto de perfil del usuario si está disponible, de lo contrario mostrar una imagen predeterminada */}
                {usuario.foto ? (
                  <img
                    src={`data:image/jpeg;base64,${usuario.foto}`}
                    alt="Foto de Perfil"
                    className="rounded-circle mr-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  <img  src="src\assets\nousuario.png"             
                    alt="Imagen Predeterminada"
                    className="rounded-circle mr-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
                <span className="text-dark"> {usuario.nombre}</span>
              </div>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaUsuarios;


