import React, { Component } from 'react';
import Navigation from '../../components/navigation/Navigation'
import FaceRecognition from '../../components/faceRecognition/FaceRecognition'
import Logo from '../../components/logo/Logo'
import Rank from '../../components/rank/Rank'
import Particles from 'react-particles-js';
import ImageLinkForm from '../../components/imageLinkForm/ImageLinkForm'
import './App.css';
import LandingPage from '../../components/landingPage/LandingPage';

const herokuServerAddress = 'https://smart-brain-faceapp1.herokuapp.com'
const localServerAddress = 'http://localhost:3000'


const particlesOptions = {
  polygon: {
    enable: true,
    type: 'inside',
    move: {radius: 10}
  }
}
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  isMenuOpen: false,
  user: {
    id: '',
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      isMenuOpen: false,
      user: {
        id: '',
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById("inputImage")
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }


  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    fetch(`${localServerAddress}/imageurl`, { //fetch for api call to clarifai on server.js [done on the back end to hide the api key]
      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
          input : this.state.input
      })
    })
    .then(response => response.json())
    .then(response => { // get the response which gets passed into the calculateFaceLocation function which in turn returns an object which gets passed into the displayFaceBox function to apply the result to the box state
      if (response) {
        fetch(`${localServerAddress}/image`, {
          method: 'put',
          headers: {'content-Type': 'application/json'},
          body: JSON.stringify({
              id : this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
      document.getElementById("bounding-box").style.display = "block"
    })
    .catch(err => console.log(err)) //catch any error and console log the error
  }

  onRouteChange = (route) =>{
    this.setState({isMenuOpen: false})
    if (route === 'SignOut'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  toggleMenu = () =>{
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  render(){
    const { isSignedIn, imageUrl, route, box, isMenuOpen } = this.state // destructure states to avoid having to repeatedly type this.state.
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        { route === 'home'
          ? <div style={{padding: "0 2rem", display: "flex", flexFlow: "column nowrap", justifyContent: "center"}}>
              <Navigation toggleMenu={this.toggleMenu} isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} isMenuOpen={isMenuOpen} menuRouteDirection="SignOut"/>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : <div>
              <LandingPage serverAddress={localServerAddress} onRouteChange={this.onRouteChange} loadUser={this.loadUser} route={route} />
            </div>}
            <footer style={{fontSize: "0.65rem", padding: "0 1rem 1rem 1rem", opacity: "70%", color:"white"}}> This app was created by <a href="https://github.com/steppan26/FaceRecognitionApp-fe/" target="_blank" rel="noopener noreferrer">STEPHANE BAROUX</a> based on the course from Zero to Mastery by Andrei Naegoie; but was then personalised and further edited</footer>
      </div>
    );
  }
}

export default App;
