// import the libs we need
import React, { Component } from 'react';
import './normalize.css';
import style from './App.css';

handleYoutubeFetch () {
  fetch(`http://localhost:3000/api/youtube`)
  .then(r => r.json())
  .then((video) => {
    // Data pulled from Api, will be determined at a later time.
  })
  .catch(error) => console.log('You\'re looking at an Error: ', error)
}

// create a React Component called _App_
class App extends Component {
  constructor() {
    super();

    this.state = {
      // states
      artistname : '',
    };
  } 

  // get a list of albums by specific artist
  function getAlbums() {
    // assuming that artist name is updated to state by input handler
    const itunesURL = 'https://itunes.apple.com/search?entity=album&term=${this.state.artistname}';

    fetch(itunesURL)
    .then(r => r.json())
    .then( data => {
      // console.log('getAlbums fetch', data);
      /* call render function */ 
    })
    .catch(err => console.log('getAlbums error', err));
  }

  render(){
    return (
      <div id="app-container">
        <header>
          <h1>Welcome to PERN Template</h1>
        </header>
        <div id={style['description-body']}>
          <p>
            Welcome to PERN Template. This is a temporary Hello World component
            that may be replaced with the rest of your React client application
          </p>
        </div>
      </div>
    );
  }
}

export default App;
