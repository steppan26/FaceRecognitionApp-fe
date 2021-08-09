import React from 'react';
import brain from './brain.png';
import './Logo.css'

const Logo = () =>{
    return(
            <div className="logoWraper">
                <img src={brain} alt="logo" className="logo" />
                <h1 className="landingTitle">Smart-Brain App</h1>
            </div>
    );
}
export default Logo;