import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
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
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
      )
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err){

      }
    )
  }
  render(){
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
      />
      <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
  );}
}

export default App;
