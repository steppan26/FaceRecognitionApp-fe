import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Logo from './components/logo/Logo'
import SignIn from './components/signIn/SignIn'
import Rank from './components/rank/Rank'
import Register from './components/register/Register'
import Particles from 'react-particles-js';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '8509e0668a58483db493b84a27c67428'
});


const particlesOptions = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 600,
      }
    },
    color: {
      value: "red"
    }
  },
  line_linked:{
    enable_auto: true,
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
    }
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
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then( response => this.displayFaceBox(this.calculateFaceLocation(response))) // get the response which gets passed into the calculateFaceLocation function which in turn returns an object which gets passed into the displayFaceBox function to apply the result to the box state
    .catch(err => console.log(err)) //catch any error and console log the error
  }

  onRouteChange = (route) =>{
    if (route === 'SignOut'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state // destructure states to avoid having to repeatedly type this.state.
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : ( route === 'SignIn'
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
