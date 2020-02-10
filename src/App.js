import React, {Component} from 'react';
import './App.css';
import Songs from './Components/Songs';
import Filter from './Components/Filter';

class App extends Component {
    constructor() {
        super();
        this.state = {
            songsPerPage: 10,
            lastSongsPerPageToggled:'',
            currentPage: 1
        };
    }

    /*setSongsPerPage=(songsPerPage)=>{
        console.log(this);
        this.setState({songsPerPage: 25})
    };*/
    setSongsPerPage = (changeEvent) => {
        changeEvent.target.style.color = 'red';
        if(this.state.lastSongsPerPageToggled){
            this.state.lastSongsPerPageToggled.style.color = 'black';
        }
        this.setState({lastSongsPerPageToggled:changeEvent.target});
        this.setState({
            songsPerPage: changeEvent.target.innerHTML
        });
    };


    render() {
      return (
          <div className="App">
              <Songs songsPerPage = {this.state.songsPerPage}/>
              <Filter/>
              <div className="songsPerPage">
                  <button className="btn" onClick={this.setSongsPerPage}>5</button>
                  <button className="btn" onClick={this.setSongsPerPage}>10</button>
                  <button className="btn" onClick={this.setSongsPerPage}>25</button>
                  <button className="btn" onClick={this.setSongsPerPage}>50</button>
                  <button className="btn" onClick={this.setSongsPerPage}>100</button>
              </div>

          </div>
      );
    }
}

export default App;
