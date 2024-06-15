import React, {useState} from 'react'

export const UsuariosPrincipalHook = () => {

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


    return {
        //propiedades
        usuarioSeleccionado, 
        modalVisible, 
        conteModal,
        // metodos 
        handleUsuarioSeleccionado,
        handleNuevoUsuarioCreado,
        handleUsuarioEliminado, 
        setModalVisible, 
        setConteoModal


    }
}
