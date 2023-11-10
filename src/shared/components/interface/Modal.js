import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalOverlay = (props) => {
  const content = (
    <div className="modal-content">
      <h3>여기서 지역설정!</h3>
      <div onClick={props.onClick} className="close-button">
        끝내기
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      <ModalOverlay {...props} />
    </React.Fragment>
  );
};

export default Modal;
