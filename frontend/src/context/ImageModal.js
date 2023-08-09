import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ImageModalContext = React.createContext();

export function ImageModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ImageModalContext.Provider value={contextValue}>
        {children}
      </ImageModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function ImageModal() {
  const { modalRef, modalContent, closeModal } = useContext(ImageModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="image-modal-background" onClick={closeModal} />
      <div id="image-modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}

export const useImageModal = () => useContext(ImageModalContext);
