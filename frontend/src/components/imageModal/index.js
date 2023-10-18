import { useImageModal } from "../../context/ImageModal"
import { useState } from "react"
function ImageModalComponent({ url, allPics }) {
    const { closeModal } = useImageModal()
    const [currIndex, setCurrIndex] = useState(allPics.indexOf(url))
    function increaseIndex() {
        if (currIndex === allPics.length - 1) {
            setCurrIndex(0)
        } else {
            setCurrIndex(currIndex + 1)
        }
    }
    function decreaseIndex() {
        if (currIndex === 0) {
            setCurrIndex(allPics.length - 1)
        } else {
            setCurrIndex(currIndex - 1)
        }
    }

    return (
        <>
            <div className="testingthisout">
                <div className="container1">
                <p style={{ color: "white" }}>{(currIndex + 1)} / {allPics.length}</p>
                </div>
                <div className="container2">
                <i class="far fa-times-circle" id="closeModalButton" onClick={() => closeModal()}></i>
                </div>

            </div>
            <div className="imageModalContainer">
                <i class="fas fa-chevron-left" onClick={() => decreaseIndex()}></i>
                <img className="zoomedInImage" src={`${allPics[currIndex % allPics.length]}`}></img>
                <i class="fas fa-chevron-right" onClick={() => increaseIndex() }></i>
            </div>
        </>
    )
}

export default ImageModalComponent
