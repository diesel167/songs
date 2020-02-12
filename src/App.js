import React, { Component, createRef } from 'react';
import './App.css';
import Songs from './Components/Songs';


class App extends Component {
    constructor() {
        super();
        this.init = createRef();
        this.state = {
            songsPerPage: 10,
            lastSongsPerPageToggled: '',  //last clicked button with songs per page counter
            currentPage: 1,
            lastCurrentPageToggled: '',
            allPagesCount: 1,
            songsCount: 0
        };
        this.howManyPages = this.howManyPages.bind(this);
    }

    //update state for initial clicked button
    componentDidMount() {
        this.setState({
            lastSongsPerPageToggled: this.init.current,
            lastCurrentPageToggled: ''
        })
    }

    //get count from Songs component and calculate amount of pages
    howManyPages = (count) => {
        let howMany = Math.ceil(count / this.state.songsPerPage);
        this.setState({
            allPagesCount: howMany,
            songsCount: count
        })
    };

    //click handler for songs per page buttons
    setSongsPerPage = (changeEvent) => {
        if(this.state.lastSongsPerPageToggled){
            //change color
            let changeColor = this.state.lastSongsPerPageToggled;
            changeColor.style.color = 'white';
            this.setState({lastSongsPerPageToggled: changeColor});
        }
        changeEvent.target.style.color = 'red';
        this.setState({
            lastSongsPerPageToggled: changeEvent.target,
            songsPerPage: changeEvent.target.innerHTML,
            currentPage: 1,
            allPagesCount: Math.ceil(this.state.songsCount / changeEvent.target.innerHTML)
        });
    };

    setPageNum = (changeEvent) => {
        this.setState({
            currentPage: changeEvent.target.innerHTML,
            lastCurrentPageToggled: changeEvent.target,
        });
    };

    generatePageNumButtons = () => {
        let buttonsNum = [];
        let i;
        //dont move 'radio' navigation at the beginning
        if(this.state.currentPage<=3 || this.state.allPagesCount<=5){
            i = 1;
        }
        //move 'radio' navigation
        if(this.state.currentPage>3 && this.state.allPagesCount>5 && this.state.currentPage<=this.state.allPagesCount-2){
            i = this.state.currentPage-2;
        }
        //dont move 'radio' navigation in the end
        if(this.state.currentPage>3 && this.state.allPagesCount>5 && this.state.currentPage>this.state.allPagesCount-2){
            i = this.state.allPagesCount-4;
        }
        for(let j = i; j <= i+4; j++){
            let temp ='';
            if(j<=this.state.allPagesCount){
                temp = <button key={this.state.allPagesCount*j}className="btn" onClick={this.setPageNum}>{j}</button>;
            }
            if(+j === +this.state.currentPage){
                temp = <button key={this.state.allPagesCount*j} className="btn" style={{color:'red'}} onClick={this.setPageNum}>{j}</button>;
            }
            buttonsNum.push(temp);
        }
        return buttonsNum;
    };

    render() {
        return (
            <div className="App">
                <Songs
                    songsPerPage = {this.state.songsPerPage}
                    currentPage = {this.state.currentPage}
                    howManyPages = {this.howManyPages}/>
                <div className="footer">
                    <div className="pageNum">
                        {this.generatePageNumButtons()}
                        | of {this.state.allPagesCount}
                    </div>
                    <div className="songsPerPage">
                        <button className="btn" onClick={this.setSongsPerPage}>5</button>
                        <button className="btn" ref={this.init} style={{color: 'red'}} onClick={this.setSongsPerPage}>10</button>
                        <button className="btn" onClick={this.setSongsPerPage}>25</button>
                        <button className="btn" onClick={this.setSongsPerPage}>50</button>
                        <button className="btn" onClick={this.setSongsPerPage}>100</button>
                    </div>
                </div>
          </div>
      );
    }
}

export default App;
