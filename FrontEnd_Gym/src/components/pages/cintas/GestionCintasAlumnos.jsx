import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import UserContext from '../Usuarios/UserContext';
import "../../../styles/ModalAE.css";
import "../../../styles/TablaAE.css";

export const GestionCintasAlumnos = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [gridRegistros, setGridRegistros] = useState([]);

  const [optionsArtesMarciales, setOptionsArtesMarciales] = useState([]);
  const [optionsAlumnos, setOptionsAlumnos] = useState([]);
  const [optionsCintas, setOptionsCintas] = useState([]);
  const [editarRegistro, setEditarRegistro] = useState(null);

  const [idArteMarcial, setIDArteMarcial] = useState(0);
  const [idAlumno, setIDAlumno] = useState(0);

  const [fecha, setFecha] = useState("");
  const [idMatricula, setIDMatricula] = useState(0);
  const [idCinta, setIDCinta] = useState(0);


  const urlBase = "http://localhost:3000/api/graduaciones";

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
    obtenerCintas();
  }, []);

  useEffect(() => {
    if (idArteMarcial > 0) {
      obtenerAlumnos(idArteMarcial);
    }
  }, [idArteMarcial]);

  useEffect(() => {
    if (idAlumno > 0) {
      obtenerIDMatricula(idAlumno);
    }
  }, [idAlumno]);

  useEffect(() => {
    obtenerGrid();
  }, [idMatricula]);

  const obtenerGrid = async () => {
    try {
      const response = await axios.get(`${urlBase}${idAlumno > 0 ? "/" + idMatricula + "/" + idAlumno : "/"}`);
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

  const obtenerCintas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cintas");
      setOptionsCintas(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const obtenerAlumnos = async (idArteMarcial) => {
    const endpoint = `http://localhost:3000/api/matriculas/${idArteMarcial}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setOptionsAlumnos(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const obtenerIDMatricula = async (idAlumno) => {
    const endpoint = `http://localhost:3000/api/matriculas/${idArteMarcial}/${idAlumno}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      const matriculas = data;
      setIDMatricula(matriculas[0].id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRegistro = (RegistroAEditar = null) => {
    setEditarRegistro(RegistroAEditar);
    setShowModal(true);
    setFecha(RegistroAEditar ? formatDateYYYYMMDD(RegistroAEditar.fecha) : "");
    setIDMatricula(RegistroAEditar ? RegistroAEditar.idmatricula : idMatricula);
    setIDCinta(RegistroAEditar ? RegistroAEditar.idcinta : idCinta);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditarRegistro(null);
    setFecha("");
    setIDCinta(0);
  };

  const handleGuardarRegistro = async (id = 0) => {
    try {
      if (fecha.length == 0) {
        return showAlert("error", "Atención", "Debe colocar una fecha.");
      }
      if (idMatricula == 0 || idCinta == 0) {
        return showAlert("error", "Atención", `Debe seleccionar un ${idMatricula == 0 ? "arte marcial y/o Alumno" : "cinta"}.`);
      }

      if (id == 0) {
        await axios.post(urlBase, {
          fecha: fecha,
          idMatricula: idMatricula,
          idCinta: idCinta,
          idUsuarios: userLogin.id,
        });
      } else {
        await axios.put(`${urlBase}/${editarRegistro.id}`, {
          fecha: fecha,
          idMatricula: idMatricula,
          idCinta: idCinta,
          idUsuarios: userLogin.id,
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
          Gestión de Cintas Por Alumno
        </h4>
      </div>

      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end gap-2">

        <select id="idArteMarcial" name="idArteMarcial" value={idArteMarcial} onChange={(e) => setIDArteMarcial(e.target.value)}>
          <option value="0">Seleccione un Curso</option>
          {optionsArtesMarciales.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nombre}
            </option>
          ))}
        </select>

        <select id="idalumno" name="idalumno" value={idAlumno} onChange={(e) => setIDAlumno(e.target.value)}>
          <option value="0">Seleccione un Alumno</option>
          {optionsAlumnos.map((option) => (
            <option key={option.idusuarios} value={option.idusuarios}>
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
            <th>Fecha</th>
            <th>Fecha Inicio</th>
            <th>Arte Marcial</th>
            <th>Cinta</th>
            <th>Nombre</th>
            <th>Maestro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gridRegistros.map((registro) => (
            <tr key={registro.id}>
              <td>{registro.id}</td>
              <td>{formatDate(registro.fecha)}</td>
              <td>{formatDate(registro.fechainicio)}</td>
              <td>{registro.arte_marcial}</td>
              <td>{registro.cinta}</td>
              <td>{registro.nombrealumno}</td>
              <td>{registro.nombremaestro}</td>
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

          <select id="idCinta" name="idCinta" value={idCinta} onChange={(e) => setIDCinta(e.target.value)}>
            <option value="0">Seleccione una Cinta</option>
            {optionsCintas.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nombre} {option.apellido}
              </option>
            ))}
          </select>
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