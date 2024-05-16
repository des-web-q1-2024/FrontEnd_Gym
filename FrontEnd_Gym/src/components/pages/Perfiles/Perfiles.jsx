import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import "../../../styles/Modal.css";
import "../../../styles/Tablas.css";

const Perfiles = () => {
    const [perfiles, setPerfiles] = useState([]);
    const [showNuevoModal, setShowNuevoModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [nombrePerfil, setNombrePerfil] = useState("");
    const [perfilEditar, setPerfilEditar] = useState(null);

    useEffect(() => {
        obtenerPerfiles();
    }, []);

    const obtenerPerfiles = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/Perfiles");
            setPerfiles(response.data);
        } catch (error) {
            console.error("Error al obtener perfiles:", error);
        }
    };

    const handleNuevoPerfil = () => {
        setShowNuevoModal(true);
    };

    const handleCloseNuevoModal = () => {
        setShowNuevoModal(false);
        setNombrePerfil("");
    };

    const handleEditarPerfil = (perfil) => {
        setPerfilEditar(perfil);
        setShowEditarModal(true);
        setNombrePerfil(perfil.nombre);
    };

    const handleCloseEditarModal = () => {
        setShowEditarModal(false);
        setPerfilEditar(null);
        setNombrePerfil("");
    };

    const handleGuardarNuevoPerfil = async () => {
        try {
            if (nombrePerfil.length == 0) {
         
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Debe colocar un nombre de perfil",
                });
            } else {

                await axios.post("http://localhost:3000/api/Perfiles", {
                    nombre: nombrePerfil,
                    activo: true,
                });
                handleCloseNuevoModal();
                obtenerPerfiles();
                Swal.fire({
                    icon: "success",
                    title: "Nuevo Perfil",
                    text: "se a creado el nuevo perfil " + nombrePerfil,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al crear perfil "+ error,
            });
            //console.error("Error al crear perfil:", error);
        }
    };

    const handleGuardarPerfilEditado = async () => {
        try {
            if (nombrePerfil.length == 0) {
               
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Debe colocar un nombre de perfil",
                });
            } else {

                await axios.put(`http://localhost:3000/api/Perfiles/${perfilEditar.id}`, {
                    nombre: nombrePerfil,
                    activo: perfilEditar.activo,
                });
                handleCloseEditarModal();
                obtenerPerfiles();
                Swal.fire({
                    icon: "success",
                    title: "Actualizacion de Perfil",
                    text: "se a actualizado el perfil ",
                });
            }

        } catch (error) {
            wal.fire({
                icon: "error",
                title: "Actualizar",
                text: "Error al editar perfil" + error,
            });
            //console.error("Error al editar perfil:", error);
        }
    };

    const handleEliminarPerfil = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/Perfiles/${id}`);
            obtenerPerfiles();
            Swal.fire({
                icon: "error",
                title: "Eliminado",
                text: "Perfil Eliminado",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Eliminado",
                text: "Error al eliminar perfil" + error,
            });
           // console.error("Error al eliminar perfil:", error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-end mb-2">
                <Button onClick={handleNuevoPerfil} variant="warning">
                    <BsPlusCircle className="me-2" /> Nuevo Perfil
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {perfiles.map((perfil) => (
                        <tr key={perfil.id}>
                            <td>{perfil.nombre}</td>
                            <td>{perfil.activo ? "Activo" : "Inactivo"}</td>
                            <td>
                                <Button onClick={() => handleEditarPerfil(perfil)} variant="success">
                                    <BsPencilSquare className="me-2" /> Editar
                                </Button>
                                {" "}
                                <Button onClick={() => handleEliminarPerfil(perfil.id)} variant="danger">
                                    <BsTrash className="me-2" /> Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Nuevo Perfil Modal */}
            <Modal show={showNuevoModal} onHide={handleCloseNuevoModal} className="custom-modal">
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title>Nuevo Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    <input
                        type="text"
                        value={nombrePerfil}
                        onChange={(e) => setNombrePerfil(e.target.value)}
                        placeholder="Nombre del perfil"
                        className="form-control"
                    />
                </Modal.Body>
                <Modal.Footer className="custom-modal-footer">
                    <Button variant="secondary" onClick={handleCloseNuevoModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGuardarNuevoPerfil}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Editar Perfil Modal */}
            <Modal show={showEditarModal} onHide={handleCloseEditarModal} className="custom-modal">
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    <input
                        type="text"
                        value={nombrePerfil}
                        onChange={(e) => setNombrePerfil(e.target.value)}
                        className="form-control"
                        placeholder="Nombre del perfil"
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={perfilEditar && perfilEditar.activo}
                            onChange={(e) =>
                                setPerfilEditar({ ...perfilEditar, activo: e.target.checked })
                            }
                        />{" "}
                        Activo
                    </label>
                </Modal.Body>
                <Modal.Footer className="custom-modal-footer">
                    <Button variant="secondary" onClick={handleCloseEditarModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGuardarPerfilEditado}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Perfiles;
