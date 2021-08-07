import React from 'react';
import './FaceRecognition.css';
import Tilt from 'react-tilt'


const FaceRecognition = ({ imageUrl, box }) => {
    let isImage = "block"
    if (imageUrl){
        isImage = "block"
    } else {
        isImage = "none"
    }
    return(
        <div className="center imageWrapper">
            <Tilt className="Tilt" options={{ max : 35 }} style={{ height: 250, width: 250 }} >
                <div className="faceRecognition-wrapper" style={{display: isImage}}>
                    <img id="inputImage" src={imageUrl} alt="" width='250px' height='auto'/>
                    <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></div>
                </div>
            </Tilt>
        </div>
    )
}

export default FaceRecognition;