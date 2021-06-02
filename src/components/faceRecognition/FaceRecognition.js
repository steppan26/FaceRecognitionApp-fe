import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return(
        <div className="center">
            <div>
                <img src={imageUrl} alt="" width='500px' height='auto'/>
            </div>
        </div>
    )
}

export default FaceRecognition;