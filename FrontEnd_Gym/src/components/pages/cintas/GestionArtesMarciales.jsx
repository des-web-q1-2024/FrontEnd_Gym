import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import UserContext from '../Usuarios/UserContext';
import "../../../styles/ModalAE.css";
import "../../../styles/TablaAE.css";

export const GestionArtesMarciales = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [gridRegistros, setGridRegistros] = useState([]);
  const [editarRegistro, setEditarRegistro] = useState(null);
  const [nombreArteMarcial, setNombreArteMarcial] = useState("");
  const urlBase = "http://localhost:3000/api/arteMarcial";

  const showAlert = (icon, title, text) => {
    Swal.fire({ icon, title, text, });
  };

  useEffect(() => {
    obtenerGrid();
  }, []);

  const obtenerGrid = async () => {
    try {
      const response = await axios.get(urlBase);
      setGridRegistros(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const handleRegistro = (RegistroAEditar = null) => {
    setEditarRegistro(RegistroAEditar);
    setShowModal(true);
    setNombreArteMarcial(RegistroAEditar ? RegistroAEditar.nombre : "");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditarRegistro(null);
    setNombreArteMarcial("");
  };

  const handleGuardarRegistro = async (id = 0) => {
    try {
      if (nombreArteMarcial.length == 0) {
        return showAlert("error", "Atención", "Debe colocar un nombre de arte marcial");
      }

      if (id == 0) {
        await axios.post(urlBase, {
          nombre: nombreArteMarcial,
          activo: true,
        });
      } else {
        await axios.put(`${urlBase}/${editarRegistro.id}`, {
          nombre: nombreArteMarcial,
          activo: editarRegistro.activo,
        });
      }
      handleCloseModal();
      obtenerGrid();
      showAlert("success", "Registro", `Se ha ${id == 0 ? "creado" : "modificado"} el registro: ${nombreArteMarcial}`);
    } catch (error) {
      showAlert("error", "Error", `Error al crear registro: ${error.message}`);
    }
  };

  const handleEliminarRegistro = async (id) => {
    try {
      await axios.delete(`${urlBase}/${id}`);
      obtenerGrid();
      showAlert("error", "Eliminado", `Registro eliminado`);
    } catch (error) {
      showAlert("error", "Error", `Error al eliminar registro: ${error.message}`);
    }
  };

  return (
    <>
      <div className="col">
        <h4 className="card-header text-black-50 ff-inter fw-medium">
          Gestión de Artes Marciales
        </h4>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Button onClick={() => handleRegistro()} variant="warning">
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
          {gridRegistros.map((registro) => (
            <tr key={registro.id}>
              <td>{registro.id}</td>
              <td>{registro.nombre}</td>
              <td>{registro.activo ? "Activo" : "Inactivo"}</td>
              <td>
                <Button onClick={() => handleRegistro(registro)} variant="success" title="Editar Registro" >
                  <BsPencilSquare className="me-2" />
                </Button>
                {" "}
                <Button onClick={() => handleEliminarRegistro(registro.id)} variant="danger" title="Eliminar Registro" >
                  <BsTrash className="me-2" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>{editarRegistro && editarRegistro.id ? "Modificando" : "Creando"} Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <input type="text" value={nombreArteMarcial} onChange={(e) => setNombreArteMarcial(e.target.value)} placeholder="Nombre del arte marcial" className="form-control" />
          {editarRegistro && (
            <label>
              <input type="checkbox" checked={editarRegistro && editarRegistro.activo} onChange={(e) =>
                setEditarRegistro({ ...editarRegistro, activo: e.target.checked })
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
          <Button variant="primary" onClick={() => handleGuardarRegistro(editarRegistro && editarRegistro.id ? editarRegistro.id : 0)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}