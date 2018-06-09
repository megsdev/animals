import React, { Component } from 'react';
import './App.css';
import axios from 'axios'



const BASE_URL = 'http://localhost:4000/api/animals'

class App extends Component {
  constructor() {
    super()

    this.state = {
      animals: [],
      newAnimalName: '',
      newAnimalImage: '',
      newAnimalDescription: '',
      animalIdBeingEdited: ''
    }
  }

componentDidMount = () => {
  axios({
    method: 'GET',
    url: BASE_URL 
  }).then(response => {
    this.setState({ animals: response.data })
  })
}

addAnimal = () => {
  axios({
    method: 'POST',
    url: BASE_URL,
    data: {name: this.state.newAnimalName, imageUrl: this.state.newAnimalImage }
  }).then(response => {
    this.setState({ animals: response.data })
  })
}

updateDescription = (id) => {
  axios({
    method: 'PUT',
    url: BASE_URL + '/' + this.state.animalIdBeingEdited ,
    data: { description: this.state.newAnimalDescription }
  }).then( response => {
    this.setState({ animals: response.data })
  })
}

deleteAnimal = (animalid) => {
  axios({
    method: 'DELETE',
    url: BASE_URL + '/' + animalid
    
  }).then( response => {
    this.setState({ animals: response.data })
  })
}

  render() {
    console.log('this.state.animals: ', this.state.animals)
    return (
      <div className="container">
      <div className='container-row'>
        <input className='input'
               placeholder='enter animal name' 
               onChange={ (event) => this.setState({ newAnimalName: event.target.value }  )} />
        <input className='input'
               placeholder='paste image url here' 
               onChange={ (event) => this.setState({ newAnimalImage: event.target.value }) } />
        <button className='button' onClick={ () => this.addAnimal() }>save</button>
      </div>   


      { this.state.animals.map( (animal) => (
          <div key={ animal.id } className='container-row'>
            <div style={{ width: '50%' }} >
              <img className='img' src={ animal.imageUrl } alt='' />
            </div>
            <div style={{ width: '50%' }} >
              <h3> Animal: { animal.name} </h3>
              <h3> Description: </h3>
              <p>{ animal.description }</p>
              <button className='button' onClick={() => this.setState({ animalIdBeingEdited: animal.id })}>Edit</button>
              <button className='button' onClick={ () => this.deleteAnimal( animal.id ) }>Delete</button>
              <div>{this.state.animalIdBeingEdited === animal.id && 
                <div>
                  <input className='input' placeholder="description" onChange={ (event) => this.setState({ newAnimalDescription: event.target.value })} /> 
                  <button className='button' onClick={ () => this.updateDescription() } >update</button>
                </div> }
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
