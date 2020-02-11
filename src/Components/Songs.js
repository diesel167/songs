import React, {Component} from 'react';



class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: '',
            isAllSongsLoaded: false,
            sorted: ''
        };
    }

    componentDidMount() {
        fetch('https://api.myjson.com/bins/sml9c')
            .then(response => response.json())
            .then((a)=>{
                this.setState({songs: [...a.songs]});
                this.setState({isAllSongsLoaded: true});
                this.props.howManyPages(a.songs.length);
            });
    }

    rows=()=>{
        //temp container for songs
        let temp = [];

        if(this.state.isAllSongsLoaded){
            let start = this.props.currentPage*this.props.songsPerPage-this.props.songsPerPage;
            let end = this.props.currentPage*this.props.songsPerPage > this.state.songs.length ? this.state.songs.length : this.props.currentPage*this.props.songsPerPage;
            this.state.songs.slice(start,end).map(song => {
                let row=<tr>
                    <td>{song.artist}</td>
                    <td>{song.title}</td>
                    <td>{song.year}</td>
                </tr>;
                temp.push(row);
            });
            return temp;
        }
    };

    sortBySinger=()=>{
        let unsorted = this.state.songs;
        if(this.state.sorted === 'singerAsc'){
            unsorted.reverse();
            this.setState({
                songs: unsorted,
                sorted: 'singerDesc'
            })
        }
        else if(this.state.sorted === 'singerDesc'){
            unsorted.reverse();
            this.setState({
                songs: unsorted,
                sorted: 'singerAsc'
            })
        }
        else{
            unsorted.sort(function(a, b){
                if(a.artist < b.artist) { return -1; }
                if(a.artist > b.artist) { return 1; }
                return 0;
            })
            this.setState({
                songs: unsorted,
                sorted: 'singerAsc'
            })
        }
    };
    sortBySong=()=>{
        let unsorted = this.state.songs;
        if(this.state.sorted === 'songAsc'){
            unsorted.reverse();
            this.setState({
                songs: unsorted,
                sorted: 'songDesc'
            })
        }
        else if(this.state.sorted === 'songDesc'){
            unsorted.reverse();
            this.setState({
                songs: unsorted,
                sorted: 'songAsc'
            })
        }
        else{
            unsorted.sort(function(a, b){
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            })
            this.setState({
                songs: unsorted,
                sorted: 'songAsc'
            })
        }
    };
    sortByYear=()=>{
        let unsorted = this.state.songs;
        if(this.state.sorted === 'yearAsc'){
            unsorted.reverse();
            this.setState({
                songs: unsorted,
                sorted: 'yearDesc'
            })
        }
        else if(this.state.sorted === 'yearDesc'){
            unsorted.reverse();
            this.setState({
                songs: unsorted,
                sorted: 'yearAsc'
            })
        }
        else{
            unsorted.sort(function(a, b){
                if(a.year < b.year) { return -1; }
                if(a.year > b.year) { return 1; }
                return 0;
            })
            this.setState({
                songs: unsorted,
                sorted: 'yearAsc'
            })
        }
    };

    render() {
        return (
            <div className='songs'>
                <table>
                    <thead>
                        <tr>
                            <th onClick={this.sortBySinger}>Singer</th>
                            <th onClick={this.sortBySong}>Song</th>
                            <th onClick={this.sortByYear}>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Songs;