import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Css/Comentarios.css";

const CommentList = ({ userId, contador }) => {
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState(null);
  const [visibleThreads, setVisibleThreads] = useState({});
  const [replyingToUser, setReplyingToUser] = useState(null); // Nuevo estado para almacenar el nombre del usuario al que se está respondiendo

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/Muro/post/${userId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [userId, contador]);

  const handleLike = async (commentId) => {
    try {
      const isLiked = likedComments.includes(commentId);
      if (isLiked) {
        await axios.delete(`${import.meta.env.VITE_URL}/api/Muro/post/comentario`, {
          data: {
            idPost: commentId,
            idUsuarios: userId,
          },
        });
        setLikedComments(likedComments.filter((id) => id !== commentId));
      } else {
        await axios.post(`${import.meta.env.VITE_URL}/api/Muro/post/comentario`, {
          idPost: commentId,
          idUsuarios: userId,
        });
        setLikedComments([...likedComments, commentId]);
      }

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

  const handleReply = (commentId, userName) => {
    setReplyingTo(commentId);
    setReplyingToUser(userName);
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
      await axios.post(`${import.meta.env.VITE_URL}/api/Muro/post/hilo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setReplyText("");
      setReplyImage(null);
      setReplyingTo(null);
      setReplyingToUser(null);

      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/Muro/post/${userId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const [threadComments, setThreadComments] = useState({});

  useEffect(() => {
    const fetchThreadComments = async (commentId) => {
      try {
        const response = await axios.get(
         `${import.meta.env.VITE_URL}/api/Muro/post/Hilocomentario/${commentId}`
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

  const toggleThreadVisibility = (commentId) => {
    setVisibleThreads((prevVisibleThreads) => ({
      ...prevVisibleThreads,
      [commentId]: !prevVisibleThreads[commentId],
    }));
  };

  return (
    <div className="comments-container">
      <h2 className="ms-3">Que escriben los demas... </h2>
      <ul id="comments-list ">
        {comments.map((comment) => (
          <li key={comment.id}>
            <div className="comment-box mt-5">
              <div className="comment-head">
                <h6 className="comment-name">{comment.encabezado}</h6>
                <h6 className="comment-name">
                  <a href="#">{comment.nombre}</a>
                </h6>
                <span>{comment.tiempo_transcurrido}</span>
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
                    <p>Respondiendo a: {replyingToUser}</p>
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
              <div className="comment-footer">
                <div
                  className="like-section"
                  onClick={() => handleLike(comment.id)}
                >
                  <i
                    className={`fa fa-heart ${
                      likedComments.includes(comment.id) ? "liked" : ""
                    }`}
                    title={
                      likedComments.includes(comment.id) ? "Dislike" : "Like"
                    }
                  ></i>
                  <span>{comment.likes}</span>
                </div>
                <div
                  className="like-section"
                  onClick={() => handleReply(comment.id, comment.nombre)}
                >
                  <i className="fa fa-comment" title="Comentar"></i>
                  <span>
                    {threadComments[comment.id]?.length || 0} comentarios
                  </span>
                </div>
                <div
                  className="like-section"
                  onClick={() => toggleThreadVisibility(comment.id)}
                >
                  <i
                    className={`fa ${
                      visibleThreads[comment.id]
                        ? "fa-eye-slash text-danger"
                        : "fa-eye"
                    }`}
                    title={
                      visibleThreads[comment.id] ? (
                        <span>Ocultar comentarios</span>
                      ) : (
                        <span>Ver comentarios</span>
                      )
                    }
                  >
                    {" "}
                  </i>
                  <label>
                    {visibleThreads[comment.id] ? (
                      <span>Ocultar comentarios</span>
                    ) : (
                      <span>Ver comentarios</span>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {visibleThreads[comment.id] && threadComments[comment.id] && (
              <ul className="comments-list reply-list">
                {threadComments[comment.id].map((threadComment) => (
                  <li key={threadComment.id}>
                    <div className="comment-avatar">
                      <img
                        src={`data:image/jpeg;base64,${threadComment.fotousuario}`}
                        alt=""
                      ></img>
                    </div>
                    <div className="comment-box">
                      <div className="comment-head">
                        <h6 className="comment-name">
                          <a href="http://creaticode.com/blog">
                            {threadComment.nombre}
                          </a>
                        </h6>
                        <span>{threadComment.tiempo_transcurrido}</span>
                        <div
                          className="like-section"
                          onClick={() => handleLike(threadComment.id)}
                        >
                          <i
                            className={`fa fa-heart ${
                              likedComments.includes(threadComment.id)
                                ? "liked"
                                : ""
                            }`}
                            title={
                              likedComments.includes(threadComment.id)
                                ? "Dislike"
                                : "Like"
                            }
                          ></i>
                          <span>{threadComment.likes}</span>
                        </div>
                        <div
                          className="like-section"
                          onClick={() =>
                            handleReply(threadComment.id, threadComment.nombre)
                          }
                        >
                          <i className="fa fa-reply" title="Responder"></i>
                        </div>
                      </div>
                      <div className="comment-content">
                        <div className="row ms-2">
                          {threadComment.descripcion}
                        </div>
                        <div className="row">
                          {threadComment.foto ? (
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
                        {replyingTo === threadComment.id && (
                          <div className="reply-form-container">
                            <h6>Respondiendo a: {replyingToUser}</h6>
                            <textarea
                              value={
                                replyText.startsWith(`@${replyingToUser}`)
                                  ? replyText
                                  : `@${replyingToUser} ${replyText}`
                              }
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={`Escribe tu respuesta a ${replyingToUser} ...`}
                              required
                            ></textarea>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setReplyImage(e.target.files[0])}
                            />
                            <div>
                              <button type="button" onClick={handleSubmitReply}>
                                Enviar
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setReplyText("");
                                  setReplyImage(null);
                                  setReplyingTo(null);
                                  setReplyingToUser(null);
                                }}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
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
