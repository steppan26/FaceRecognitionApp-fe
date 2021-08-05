import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Logo from './components/logo/Logo'
import SignIn from './components/signIn/SignIn'
import Rank from './components/rank/Rank'
import Register from './components/register/Register'
import Particles from 'react-particles-js';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import './App.css';




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
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: 'SignIn',
  isSignedIn: false,
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
    fetch('http://localhost:3000/imageurl', { //fetch for api call to clarifai on server.js [done on the back end to hide the api key]
      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
          input : this.state.input
      })
    })
    .then(response => response.json())
    .then( response => { // get the response which gets passed into the calculateFaceLocation function which in turn returns an object which gets passed into the displayFaceBox function to apply the result to the box state
      if (response) {
        fetch('http://localhost:3000/image', {
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
    })
    .catch(err => console.log(err)) //catch any error and console log the error
  }

  onRouteChange = (route) =>{
    if (route === 'SignOut'){
      this.setState(initialState)
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : ( route === 'SignIn'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
