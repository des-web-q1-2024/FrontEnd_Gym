import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
// import "../../../styles/RegistroParticipaciones.css";
import "../../../styles/Eventos.css";
// import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const RegistroParticipaciones = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Hola, soy un Modal!</h2>
      </div>
    </div>
  );
};

export default RegistroParticipaciones;
