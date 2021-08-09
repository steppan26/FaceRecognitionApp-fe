import React from 'react';
import './FaceRecognition.css';
import Tilt from 'react-tilt'
import stockImage from '../landingPage/landingPage_image.jpg'


const FaceRecognition = ({ imageUrl, box }) => {
    if (!imageUrl){
        imageUrl = stockImage
    }

    return(
        <div className="center imageWrapper">
            <Tilt className="Tilt center" options={{ max : 35 }} style={{ height: 250, width: 250}} >
                <div className="faceRecognition-wrapper pb4" style={{display: "block"}}>
                    <img id="inputImage" src={imageUrl} alt="" />
                    <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></div>
                </div>
            </Tilt>
        </div>
    )
}

export default FaceRecognition;