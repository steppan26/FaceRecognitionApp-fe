import React from 'react'
import './LandingPage.css'
import SignIn from '../../components/signIn/SignIn'
import Register from '../../components/register/Register'
import landingImage from './landingPage_image.jpg'


const LandingPage = ({ route, loadUser, onRouteChange }) => {
    console.log(route)
    return(
        <div className="landingPageWrapper">
            <h1 className="landingTitle">Smart-Brain App</h1>
            <div className="landingSection">
                <div className="landingImageWrapper">
                    <img src={landingImage} alt="graphic showing facial recognition example" />
                    <a href="http://www.freepik.com" style={{opacity: "10%", textDecoration:"none"}}>Designed by vectorjuice / Freepik</a>
                </div>
                <q className="quote">There are many benefits facial recognition can offer society, from preventing crimes and increasing safety and security to reducing unnecessary human interaction and labor. In some instances, it can even help support medical efforts. </q>

                <section className="userInputSection">
                    { route === "SignIn"
                        ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
                        : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
                    }
                </section>
            </div>
        </div>
    )
}

export default LandingPage