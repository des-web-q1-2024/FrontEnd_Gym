import React from 'react';

const DetalleUsuario = ({ usuario }) => {
  const estiloFormulario = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo transparente oscuro
    color: 'white', // Letras blancas
    padding: '20px', // Espaciado interno
    borderRadius: '10px', // Bordes redondeados
    maxWidth: '300px', // Ancho máximo
    margin: '0 auto', // Centrar en el medio
    marginTop: '20px', // Margen superior
  };

  return (
    <div>
      {/* <h2>Detalle del Usuario</h2> */}
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
                src="https://tienda.cderma.com.co/wp-content/uploads/2022/05/IMAGEN-NO-DISPONIBLE.png"
                alt="Imagen Predeterminada"
                className="rounded-circle mr-3"
                style={{ width: "200px", height: "200px" }}
              />
            )}
          <p>Nombre: {usuario.nombre}</p>
          <p>Apellido: {usuario.apellido}</p>
          <p>Correo: {usuario.correo}</p>
          <p>Fecha de Nacimiento: {usuario.fechaNacimiento}</p>
        </div>
      )}
    </div>
  );
};

export default DetalleUsuario;

