import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) =>{
        if (isSignedIn){
            return(
        <nav className="nav" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('SignOut')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
        </nav>
            );
        } else {
            return(
                <nav className="nav" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('SignIn')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('Register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            );
        }
}

export default Navigation;