import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = () =>{
    return(
        <div>
            <p>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center">
                <input type="text" />
                <button>Detect</button>
            </div>
        </div>
    );
}
export default ImageLinkForm;