import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/post.css";
import UserContext from "../Usuarios/UserContext";
import CommentList from "./CommentList";

const PostForm = () => {
  const [encabezado, setEncabezado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const { userLogin } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "descripcion" && value.length <= 300) {
      setDescripcion(value);
      setCharCount(value.length);
    } else if (name !== "descripcion") {
      setEncabezado(value);
    }
  };

  const handleFotoChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    userLogin.id = 19;

    const formData = new FormData();
    formData.append("encabezado", encabezado);
    formData.append("descripcion", descripcion);
    formData.append("idUsuarios",userLogin.id );
    if (foto) {
      formData.append("foto", foto);
    }
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Muro/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEncabezado("");
      setDescripcion("");
      setFoto(null);
      setCharCount(0);
    } catch (error) {
      console.error("Error al insertar post:", error);
    }
  };

  return (
  
    <div className="cardComment">
    <Form onSubmit={handleSubmit}>
      <div className="cardComment v-card v-sheet theme--light elevation-2">
        <span className="headline">¿Qué estás pensando hoy?</span>
        <div className="sign-in-wrapper">
          <p className="caption disclaimer">
            <Form.Control
              type="text"
              name="encabezado"
              placeholder="Título"
              className="bg-light"
              value={encabezado}
              onChange={(e) => setEncabezado(e.target.value)}
              style={{ resize: "none" }}
              required
            />
          </p>
          <p className="caption disclaimer">
            <Form.Control
              as="textarea"
              rows="3"
              name="descripcion"
              className="bg-light"
              placeholder="Descripción (máximo 300 caracteres)"
              value={descripcion}
              onChange={handleInputChange}
              style={{ resize: "none" }}
              required
            />
            <ProgressBar
              now={charCount}
              max={300}
              label={`${charCount}/300`}
              className="ms-2 justify-content-left"
            />
          </p>
          <p className="caption disclaimer">
            <Form.Control
              type="file"
              name="foto"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
            />
          </p>
          <p className="actions">
            <Button variant="outline-primary" type="submit">
              Publicar
            </Button>
          </p>
          <hr></hr>
          
          <CommentList userId={19} />
          <p className="error-message"></p>
        </div>
      </div>
    </Form>
    </div>
  );
};

export default PostForm;
