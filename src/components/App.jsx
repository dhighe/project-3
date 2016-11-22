// import the libs we need
import React, { Component } from 'react';
import PlayList from './PlayList/PlayList.jsx';
import AlbumList from './AlbumList/AlbumList.jsx';
import SearchForm from './SearchForm/SearchForm.jsx';
import './normalize.css';
import style from './App.css';
const $ = require('jquery');

// create a React Component called _App_
class App extends Component {
  constructor() {
    super();

    this.state = {
      // states
      artistname    : '',
      searchArtist  : '',
      albumList     : [],
      playlist      : [],
    };
  }
  // get a list of albums by specific artist
  getAlbums() {
    // assuming that artist name is updated to state by input handler
    const itunesURL = `https://itunes.apple.com/search?entity=album&term=${this.state.searchArtist}`;
    // const itunesURL = 'https://itunes.apple.com/search?entity=album&term=kesha';

    // console.log($('body')[0])
    $.ajax({
      url : itunesURL,
      type: 'GET',
      dataType: 'jsonp',
      success: data => {
        console.log('before filtered ', data.results.length);
        const filterAlbums = data.results.filter( el => {
          return el.trackCount !== 1;
        })
        console.log('after filtered', filterAlbums.length);
        this.setState({
          albumList: filterAlbums,
        });
        console.log(this.state.albumList)
      }
    });

    this.setState({
      searchArtist: '',
    });
  }
  // udpate searchArtist state on every change at input search
  handleInputChange(e) {
    // console.log('input value:', e.target.value);
    this.setState({
      searchArtist: e.target.value,
    });
  }

  // handleYoutubeFetch () {
  //   fetch(`http://localhost:3000/api/youtube`)
  //   .then(r => r.json())
  //   .then((video) => {
  //     // Data pulled from Api, will be determined at a later time.
  //   })
  //   .catch(error) => console.log('You\'re looking at an Error: ', error)
  // }

  // function that will hit our database API and set an array of data to the playlist state
  getPlayList() {
    fetch('/playlist/1')
    .then(r => r.json())
    .then((songs) => {
      this.setState({

        playlist: songs
      });
    })
    .catch(error => console.log('You\'re looking at an Error: ', error))
  }

  // handleDelete(trackid) {
  //   fetch(`/api/puppies/${id}`, {
  //     method: 'DELETE'
  //   })
  //   .then(() => {
  //     const playlist = this.state.playlist.filter((track) => {
  //       return track.trackid !== trackid;
  //     })
  //     this.setState({ playlist: playlist })
  //   })
  //   .catch(err => console.log(err));
  // }

  render(){
    return (
      <div id="app-container">
        <header>
          <h1>Project 3</h1>
          {/* SEARCH FORM COMPONENT GOES HERE (<SearchForm />)*/}
          <SearchForm 
            handleInputChange={this.handleInputChange.bind(this)}
            handleClick={() => this.getAlbums()}
          />
        </header>

        <main>
          <div className="titles">
            <h2>Albums</h2>
            <h2 className="center-title">Songs</h2>
            <h2>PlayList</h2>
          </div>

          <section>
            {/* ALBUM LIST COMPONENT GOES HERE (<AlbumList />)*/}
            <AlbumList
              albumList={this.state.albumList}
            />

            {/* SONG LIST COMPONENT GOES HERE (<SongList />)*/}

            <PlayList
              getPlayList={this.getPlayList.bind(this)}
              playlist={this.state.playlist}
              // handleDelete={this.handleDelete.bind(this)}
             />
          </section>
        </main>

        <footer>

        </footer>
      </div>
    );
  }
}

export default App;
