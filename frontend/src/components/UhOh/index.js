import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './uhoh.css'

function Uhoh() {
    const history = useHistory()
    function handleRedirect() {
        history.push('/')
    }
    return (
        <>
            <div className="uhohPage">
                <img src="./cat404.jpg"></img>
                <button onClick={() => handleRedirect()}>Take me back!</button>
            </div>
        </>
    )
}

export default Uhoh
