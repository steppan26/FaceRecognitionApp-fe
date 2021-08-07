import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn, isMenuOpen}) =>{
    if (isMenuOpen){
        if (isSignedIn){
            return(
                <nav className="nav" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('SignOut')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
                </nav>
            );
        } else {
            return(
                <nav className="nav" >
                    <h2>SMART-BRAIN</h2>
                    <div className="btnsWrapper">
                        <p onClick={() => onRouteChange('SignIn')} className='pushRight'>Sign In</p>
                        <p onClick={() => onRouteChange('Register')} className=''>Register</p>
                    </div>
                </nav>
            );
        }
    } else {
        return (
            <div className="menuWrapper">
                <p>Menu</p>
            </div>
        )
    }
}

export default Navigation;