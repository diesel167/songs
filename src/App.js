import React, {Component} from 'react';
import './App.css';
import Songs from './Components/Songs'

class App extends Component {
    constructor() {
        super();
        this.state = {
            songsPerPage: 10,
            currentPage: 1
        };
    }




    render() {
      return (
          <div className="App">
              <Songs/>
          </div>
      );
    }
}

export default App;
