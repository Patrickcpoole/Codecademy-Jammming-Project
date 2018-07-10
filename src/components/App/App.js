import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    /*this.updateSearchTerm = this.updateSearchTerm.bind(this);*/

    this.state = {
      searchResults: [],

      playlistName: 'myPlaylist',

      playlistTracks: []};
  }

    render() {
      return (
        <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}
            playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
      );
    }


  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    let tracks = this.state.playlistTracks
      tracks.push(track)
      this.setState({playlistTracks: tracks});
    }

    removeTrack(track) {
     let tracks = this.state.playlistTracks;
     const oldTracks = tracks.filter(removedTrack => removedTrack.id !== track.id);
     this.setState({
       playlistTracks: oldTracks});
   }

   updatePlaylistName(newName) {
   this.setState({playlistName: newName});
 }

 savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);
        if (this.state.playlistName && trackURIs && trackURIs.length > 0) {
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {

        console.log(`new playlist with '${this.state.playlistName}' and ${trackURIs.length} songs successful saved.`);
        this.setState({playlistName: 'New Playlist', playlistTracks: []});
      });
    }
      }

    search(term) {
      Spotify.search(term)
      .then(searchResults => this.setState({
        searchResults: searchResults
           }));
       }

      /* updateSearchTerm(term) {
         console.log(term);
         this.setState({searchTerm: term});
       }*/
}

export default App;
