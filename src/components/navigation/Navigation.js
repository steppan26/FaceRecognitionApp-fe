import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isMenuOpen, toggleMenu}) =>{
    if (isMenuOpen){
            return(
                <nav className="nav">
                    <div className="navMenu">
                        <p onClick={() => toggleMenu('hello')} className="menu">Menu</p>
                        <p onClick={() => onRouteChange('SignOut')} className='signOut f3 link dim black underline pa3 pointer'>Sign out</p>
                    </div>
                </nav>
            );
    } else {
        return (
            <nav className="nav">
                <p onClick={() => toggleMenu()} className="menu">Menu</p>
            </nav>
        )
    }
}

export default Navigation;