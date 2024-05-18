import React, { useState, useEffect } from "react";
import axios from "axios";

const ListaUsuarios = ({ onUsuarioSeleccionado }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  return (
    <div className="container ">
      <h2 className="mt-4 text-white">Lista de Usuarios</h2>
      <div className="list-group">
        {usuarios.map((usuario) => (
          <button
            key={usuario.id}
            className="list-group-item list-group-item-action d-flex align-items-center"
            onClick={() => onUsuarioSeleccionado(usuario)}
          >
            {usuario.foto ? (
              <img
                src={`data:image/jpeg;base64,${usuario.foto}`}
                alt="Foto de Perfil"
                className="rounded-circle mr-3"
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <img
                src="https://tienda.cderma.com.co/wp-content/uploads/2022/05/IMAGEN-NO-DISPONIBLE.png"
                alt="Imagen Predeterminada"
                className="rounded-circle mr-3"
                style={{ width: "50px", height: "50px" }}
              />
            )}
            <span className="text-dark"> {usuario.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListaUsuarios;
