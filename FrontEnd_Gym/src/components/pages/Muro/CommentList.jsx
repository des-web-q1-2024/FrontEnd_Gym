import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Css/Comentarios.css";

const CommentList = ({ userId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Muro/post/${userId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [userId]);

  return (
    <div className="comments-container">
      <h2>Comentarios</h2>
      <ul id="comments-list" className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <div className="comment-main-level">
              <div className="comment-avatar">
                <img
                  src={`data:image/jpeg;base64,${comment.fotousuario}`}
                  alt="Avatar"
                />
              </div>
              <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name by-author">
                    <a href="#">{comment.nombre}</a>
                  </h6>
                  <span>{comment.tiempo_transcurrido}</span>
                  <i className="fa fa-reply"></i>
                  <i className="fa fa-heart"></i>
                </div>
                <div className="comment-content">
                  <div className="row ms-2">{comment.descripcion}</div>
                  <div className="row">
                    {comment.foto ? (
                      <img
                        src={`data:image/jpeg;base64,${comment.foto}`}
                        alt="Foto de Perfil"
                        style={{
                          width: "300px",
                          height: "300px",
                          margin: "auto",
                          borderRadius: "25px",
                          alignContent: "center",
                          opacity: "0.9",
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
