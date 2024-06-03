import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import UserContext from '../Usuarios/UserContext';
import "../../../styles/ModalAE.css";
import "../../../styles/TablaAE.css";

export const GestionMatriculas = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [gridRegistros, setGridRegistros] = useState([]);
  const [optionsArtesMarciales, setOptionsArtesMarciales] = useState([]);
  const [optionsAlumnos, setOptionsAlumnos] = useState([]);
  const [editarRegistro, setEditarRegistro] = useState(null);
  const [fecha, setFecha] = useState("");
  const [idArteMarcial, setIDArteMarcial] = useState(0);
  const [idUsuarios, setIDUsuarios] = useState(0);
  const urlBase = "http://localhost:3000/api/matriculas";

  const showAlert = (icon, title, text) => {
    Swal.fire({ icon, title, text, });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    obtenerArtesMarciales();
    obtenerAlumnos();
  }, []);

  useEffect(() => {
    obtenerGrid();
  }, [idArteMarcial]);

  const obtenerGrid = async () => {
    try {
      const response = await axios.get(`${urlBase}${idArteMarcial > 0 ? "/" + idArteMarcial : "/"}`);
      setGridRegistros(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const obtenerArtesMarciales = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/arteMarcial");
      setOptionsArtesMarciales(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const obtenerAlumnos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Usuarios");
      setOptionsAlumnos(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const handleRegistro = (RegistroAEditar = null) => {
    setEditarRegistro(RegistroAEditar);
    setShowModal(true);
    setFecha(RegistroAEditar ? formatDateYYYYMMDD(RegistroAEditar.fechainicio) : "");
    setIDArteMarcial(RegistroAEditar ? RegistroAEditar.idartemarcial : idArteMarcial);
    setIDUsuarios(RegistroAEditar ? RegistroAEditar.idusuarios : 0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditarRegistro(null);
    setFecha("");
    setIDUsuarios(0);
  };

  const handleGuardarRegistro = async (id = 0) => {
    try {
      if (fecha.length == 0) {
        return showAlert("error", "Atención", "Debe colocar una fecha.");
      }
      if (idArteMarcial == 0 || idUsuarios == 0) {
        return showAlert("error", "Atención", `Debe seleccionar un ${idArteMarcial == 0 ? "arte marcial" : "alumno"}.`);
      }

      if (id == 0) {
        await axios.post(urlBase, {
          fechainicio: fecha,
          idartemarcial: idArteMarcial,
          idusuarios: idUsuarios,
          activo: true,
        });
      } else {
        await axios.put(`${urlBase}/${editarRegistro.id}`, {
          fechainicio: fecha,
          idartemarcial: idArteMarcial,
          idusuarios: idUsuarios,
          activo: editarRegistro.activo,
        });
      }
      handleCloseModal();
      obtenerGrid();
      showAlert("success", "Registro", `Se ha ${id == 0 ? "creado" : "modificado"} el registro.`);
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
          Gestión de Matriculas
        </h4>
      </div>

      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end gap-2">

        <select id="idartemarcial" name="idartemarcial" value={idArteMarcial} onChange={(e) => setIDArteMarcial(e.target.value)}>
          <option value="0">Seleccione un Arte Marcial</option>
          {optionsArtesMarciales.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nombre}
            </option>
          ))}
        </select>
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
            <th>Arte Marcial</th>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gridRegistros.map((registro) => (
            <tr key={registro.id}>
              <td>{registro.id}</td>
              <td>{registro.arteMarcial}</td>
              <td>{formatDate(registro.fechainicio)}</td>
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
          <input id="fecha" name="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="form-control" />

          <select id="idusuarios" name="idusuarios" value={idUsuarios} onChange={(e) => setIDUsuarios(e.target.value)}>
            <option value="0">Seleccione un Alumno</option>
            {optionsAlumnos.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nombre} {option.apellido}
              </option>
            ))}
          </select>

          {editarRegistro && (
            <div>
              <label>
                <input type="checkbox" checked={editarRegistro && editarRegistro.activo} onChange={(e) =>
                  setEditarRegistro({ ...editarRegistro, activo: e.target.checked })
                }
                />{" "}
                Activo
              </label>
            </div>
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