import React from 'react';
import './FaceRecognition.css';
import stockImage from '../landingPage/landingPage_image.jpg'

const FaceRecognition = ({ imageUrl, box }) => {
    if (!imageUrl){
        imageUrl = stockImage
    }

    return(
        <div className="center imageWrapper">
            <div className="faceRecognition-wrapper pb4" style={{display: "block"}}>
                <img id="inputImage" src={imageUrl} alt="" />
                <div className="bounding-box" id="bounding-box" style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;