import React from 'react';
import './Navigation.css';
import menuIcon from './menuHamburger.svg'

const Navigation = ({onRouteChange, isMenuOpen, toggleMenu, menuRouteDirection}) =>{
    const menuName = (input) =>{
        switch(input){
            default:
            break
            case "SignIn":
                return "Sign In"
            case "SignOut":
                return "Sign Out"
            case "Register":
                return "Register"
        }
    }

    if (isMenuOpen){
            return(
                <nav className="nav" style={{backdropFilter: "grayscale(100%)"}}>
                    <img src={menuIcon} alt="Menu"onClick={() => toggleMenu('hello')} className="menu" />
                    <div className="navMenu">
                        <p onClick={() => onRouteChange(menuRouteDirection)} className='signOut f3 link dim black underline pa3 pointer'>{menuName(menuRouteDirection)}</p>
                    </div>
                </nav>
            );
    } else {
        return (
            <nav className="nav">
                <img src={menuIcon} alt="Menu"onClick={() => toggleMenu('hello')} className="menu" />
            </nav>
        )
    }
}

export default Navigation