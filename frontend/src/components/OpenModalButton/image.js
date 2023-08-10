import React, { useState } from "react";
import { useImageModal } from "../../context/ImageModal";

function OpenImageModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useImageModal();
  const noImage = "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"
  const onClick = () => {
    if(buttonText !== noImage){
      setModalContent(modalComponent);
    }
  };
  return <img id={buttonText !== noImage ? "imageClick" : null} onClick={onClick} src={`${buttonText}`}></img>;
}
export default OpenImageModalButton;
