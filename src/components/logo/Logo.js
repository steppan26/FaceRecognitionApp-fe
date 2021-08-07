import React from 'react';
import brain from './brain.png';
import Tilt from 'react-tilt'
import './Logo.css'

const Logo = () =>{
    return(
        <div>
            <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 50, width: 50 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt="logo" />
                </div>
            </Tilt>
        </div>
    );
}
export default Logo;