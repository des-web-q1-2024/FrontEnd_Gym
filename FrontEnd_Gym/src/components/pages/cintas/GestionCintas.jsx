import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import UserContext from '../Usuarios/UserContext';
import "../../../styles/ModalAE.css";
import "../../../styles/TablaAE.css";

export const GestionCintas = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [cintas, setCintas] = useState([]);
  const [cintaEditar, setCintaEditar] = useState(null);
  const [nombreCinta, setNombreCinta] = useState("");

  const showAlert = (icon, title, text) => {
    Swal.fire({ icon, title, text, });
  };

  useEffect(() => {
    obtenerCintas();
  }, []);

  const obtenerCintas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Cintas");
      setCintas(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCintaEditar(null);
    setNombreCinta("");
  };

  const handleEditarRegistro = (cinta) => {
    setCintaEditar(cinta);
    setShowModal(true);
    setNombreCinta(cinta.nombre);
  };

  const handleGuardarRegistro = async (id = 0) => {
    try {
      if (nombreCinta.length == 0) {
        return showAlert("error", "Atención", "Debe colocar un nombre de cinta");
      }

      if (id == 0) {
        await axios.post("http://localhost:3000/api/Cintas", {
          nombre: nombreCinta,
          activo: true,
          idusuarios: userLogin.id,
        });
      } else {
        await axios.put(`http://localhost:3000/api/Cintas/${cintaEditar.id}`, {
          nombre: nombreCinta,
          activo: cintaEditar.activo,
          idusuarios: userLogin.id,
        });
      }
      handleCloseModal();
      obtenerCintas();
      showAlert("success", "Registro", `Se ha ${id == 0 ? "creado" : "modificado"} el registro: ${nombreCinta}`);
    } catch (error) {
      showAlert("error", "Error", `Error al crear registro: ${error.message}`);
    }
  };

  const handleEliminarRegistro = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/Cintas/${id}`);
      obtenerCintas();
      showAlert("error", "Eliminado", `Registro eliminado`);
    } catch (error) {
      showAlert("error", "Error", `Error al eliminar registro: ${error.message}`);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <Button onClick={() => setShowModal(true)} variant="warning">
          <BsPlusCircle className="me-2" /> Nuevo Registro
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cintas.map((cinta) => (
            <tr key={cinta.id}>
              <td>{cinta.id}</td>
              <td>{cinta.nombre}</td>
              <td>{cinta.activo ? "Activo" : "Inactivo"}</td>
              <td>
                <Button onClick={() => handleEditarRegistro(cinta)} variant="success" title="Editar Registro" >
                  <BsPencilSquare className="me-2" />
                </Button>
                {" "}
                <Button onClick={() => handleEliminarRegistro(cinta.id)} variant="danger" title="Eliminar Registro" >
                  <BsTrash className="me-2" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Nuevo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <input type="text" value={nombreCinta} onChange={(e) => setNombreCinta(e.target.value)} placeholder="Nombre de la Cinta" className="form-control" />
          {cintaEditar && (
            <label>
              <input type="checkbox" checked={cintaEditar && cintaEditar.activo} onChange={(e) =>
                setCintaEditar({ ...cintaEditar, activo: e.target.checked })
              }
              />{" "}
              Activo
            </label>
          )}
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleGuardarRegistro(cintaEditar && cintaEditar.id ? cintaEditar.id : 0)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}