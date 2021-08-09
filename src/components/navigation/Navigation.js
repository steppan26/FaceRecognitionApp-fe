import React from 'react';
import './Navigation.css';
import menuIcon from './logoutLogo.png'
import menuCloseIcon from './closeIcon.svg'

const Navigation = ({onRouteChange, isMenuOpen, toggleMenu, menuRouteDirection}) =>{
    const menuName = (input) =>{
        switch(input){
            default:
            break
            case "SignIn":
                return "Register"
            case "SignOut":
                return "Sign Out"
            case "Register":
                return "Sign In"
        }
    }

    if (isMenuOpen){
        return(
            <nav className="nav" style={{backdropFilter: "grayscale(100%)"}}>
                <img src={menuCloseIcon} alt="Menu"onClick={() => toggleMenu()} className="menu" />
                <div className="navMenu">
                    <p onClick={() => onRouteChange(menuRouteDirection)} className='menuItem f3 link dim black underline pa3 pointer'>{menuName(menuRouteDirection)}</p>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="nav">
                <img src={menuIcon} alt="Menu"onClick={() => toggleMenu()} className="menu" />
            </nav>
        )
    }
}

export default Navigation