import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Css/Comentarios.css";

const CommentList = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState(null);

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

  const handleLike = async (commentId) => {
    try {
      const isLiked = likedComments.includes(commentId);
      if (isLiked) {
        await axios.delete("http://localhost:3000/api/Muro/post/comentario", {
          data: {
            idPost: commentId,
            idUsuarios: userId,
          },
        });
        setLikedComments(likedComments.filter((id) => id !== commentId));
      } else {
        await axios.post("http://localhost:3000/api/Muro/post/comentario", {
          idPost: commentId,
          idUsuarios: userId,
        });
        setLikedComments([...likedComments, commentId]);
      }

      // Update the like count in the comments state
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + (isLiked ? -1 : 1) }
            : comment
        )
      );
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("idPadre", replyingTo);
    formData.append("idUsuarios", userId);
    formData.append("descripcion", replyText);
    if (replyImage) {
      formData.append("foto", replyImage);
    }

    try {
      await axios.post("http://localhost:3000/api/Muro/post/hilo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setReplyText("");
      setReplyImage(null);
      setReplyingTo(null);
      // Fetch comments again to include the new reply
      const response = await axios.get(
        `http://localhost:3000/api/Muro/post/${userId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  // Nuevas adiciones para mostrar los hilos de comentarios debajo de cada comentario principal
  const [threadComments, setThreadComments] = useState({});

  useEffect(() => {
    const fetchThreadComments = async (commentId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Muro/post/Hilocomentario/${commentId}`
        );
        setThreadComments((prevThreadComments) => ({
          ...prevThreadComments,
          [commentId]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching thread comments:", error);
      }
    };

    comments.forEach((comment) => {
      fetchThreadComments(comment.id);
    });
  }, [comments]);

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
                  <div
                    className="like-section"
                    onClick={() => handleLike(comment.id)}
                  >
                    <i
                      className={`fa fa-heart ${
                        likedComments.includes(comment.id) ? "liked" : ""
                      }`}
                    ></i>
                    <span>{comment.likes}</span>
                  </div>
                  <div
                    className="like-section"
                    onClick={() => handleReply(comment.id)}
                  >
                    <i className="fa fa-reply"></i>
                  </div>
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
                  {replyingTo === comment.id && (
                    <div className="reply-form-container">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Escribe tu respuesta..."
                        required
                      ></textarea>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setReplyImage(e.target.files[0])}
                      />
                      <button type="button" onClick={handleSubmitReply}>
                        Enviar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {threadComments[comment.id] && (
              <ul className="comments-list reply-list">
                {threadComments[comment.id].map((threadComment) => (
                  <li key={threadComment.id}>
                    <div class="comment-avatar">
                      <img
                        src={`data:image/jpeg;base64,${threadComment.fotousuario}`}
                        alt=""
                      ></img>
                    </div>

                    <div class="comment-box">
                      <div class="comment-head">
                        <h6 class="comment-name">
                          <a href="http://creaticode.com/blog">
                            {threadComment.nombre}
                          </a>
                        </h6>
                        <span>{threadComment.tiempo_transcurrido}</span>
                        <i class="fa fa-reply"></i>
                        <i class="fa fa-heart"></i>
                      </div>
                      <div class="comment-content">
                        <div className="row ms-2">{threadComment.descripcion}</div>
                        <div className="row">
                          {comment.foto ? (
                            <img
                              src={`data:image/jpeg;base64,${threadComment.foto}`}
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
                  </li>

                  // <li key={threadComment.id} className="thread-comment">
                  //   <p>{threadComment.descripcion}</p>

                  // </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
