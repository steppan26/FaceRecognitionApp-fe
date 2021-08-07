import React from 'react';
import './FaceRecognition.css';
import Tilt from 'react-tilt'


const FaceRecognition = ({ imageUrl, box }) => {
    return(
        <div className="center imageWrapper">
            <Tilt className="Tilt" options={{ max : 35 }} style={{ height: 350, width: 350 }} >
                <div className="faceRecognition-wrapper">
                    <img id="inputImage" src={imageUrl} alt="" width='350px' height='auto'/>
                    <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></div>
                </div>
            </Tilt>
        </div>
    )
}

export default FaceRecognition;