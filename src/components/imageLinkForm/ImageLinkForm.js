import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) =>{
    return(
        <div>
            <p style={{padding: "0rem 1.5rem", lineHeight: "1.6"}}>This Magic Brain app will detect faces in your pictures. Give it a try!</p>
            <div className="center">
                <input type="text" onChange={onInputChange} id="imageInputField"/>
                <button onClick={onButtonSubmit}>Submit Image</button>
            </div>
        </div>
    );
}
export default ImageLinkForm;