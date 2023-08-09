import React from "react";
import { useImageModal } from "../../context/ImageModal";

function OpenImageModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useImageModal();

  const onClick = () => {
    setModalContent(modalComponent);
  };
  return <img id="imageClick" onClick={onClick} src={`${buttonText}`}></img>;
}
export default OpenImageModalButton;
