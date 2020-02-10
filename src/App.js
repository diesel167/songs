import React, { Component, createRef } from 'react';
import './App.css';
import Songs from './Components/Songs';
import Filter from './Components/Filter';

class App extends Component {
    constructor() {
        super();
        this.init = createRef();
        this.state = {
            songsPerPage: 10,
            lastSongsPerPageToggled: '',  //last clicked button with songs per page counter
            currentPage: 1                //number of current page
        };
    }

    //update state for initial clicked button
    componentDidMount() {
        this.setState({lastSongsPerPageToggled: this.init.current})
    }

    //click handler for songs per page buttons
    setSongsPerPage = (changeEvent) => {
        changeEvent.target.style.color = 'red';
        console.log(this.state.lastSongsPerPageToggled);
        if(this.state.lastSongsPerPageToggled){
            this.state.lastSongsPerPageToggled.style.color = 'white';
        }
        this.setState({lastSongsPerPageToggled:changeEvent.target});
        this.setState({
            songsPerPage: changeEvent.target.innerHTML
        });
    };

    setPageNum = (changeEvent) => {
        this.setState({currentPage: changeEvent.target.innerHTML})
    };

    generatePageNumButtons = () => {
        let buttonsNum = '';

        return buttonsNum;
    };

    render() {
        return (
            <div className="App">
                <Songs
                    songsPerPage = {this.state.songsPerPage}
                    currentPage = {this.state.currentPage}/>
                <Filter/>
                <div className="psgeNum">
                    <button className="btn" onClick={this.setPageNum}>1</button>
                    <button className="btn" onClick={this.setPageNum}>2</button>
                </div>
                <div className="songsPerPage">
                    <button className="btn" onClick={this.setSongsPerPage}>5</button>
                    <button className="btn" ref={this.init} style={{color: 'red'}} onClick={this.setSongsPerPage}>10</button>
                    <button className="btn" onClick={this.setSongsPerPage}>25</button>
                    <button className="btn" onClick={this.setSongsPerPage}>50</button>
                    <button className="btn" onClick={this.setSongsPerPage}>100</button>
                </div>
          </div>
      );
    }
}

export default App;
