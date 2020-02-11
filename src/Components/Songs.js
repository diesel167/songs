import React, {Component} from 'react';



class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: '',
            isAllSongsLoaded: false
        };
    }

    componentDidMount() {
        fetch('https://api.myjson.com/bins/sml9c')
            .then(response => response.json())
            .then((a)=>{
                this.setState({songs: a.songs});
                this.setState({isAllSongsLoaded: true});
                this.props.howManyPages(a.songs.length);
            });
    }

    rows=()=>{
        //temp container for songs
        let temp = [];
        if(this.state.isAllSongsLoaded){
            for(let i = 0; i < this.props.songsPerPage; i++){
                let row=<tr>
                    <td>{this.state.songs.slice(this.props.currentPage*this.props.songsPerPage-this.props.songsPerPage,this.props.currentPage*this.props.songsPerPage)[i].artist}</td>
                    <td>{this.state.songs.slice(this.props.currentPage*this.props.songsPerPage-this.props.songsPerPage,this.props.currentPage*this.props.songsPerPage)[i].title}</td>
                    <td>{this.state.songs.slice(this.props.currentPage*this.props.songsPerPage-this.props.songsPerPage,this.props.currentPage*this.props.songsPerPage)[i].year}</td>
                </tr>;
                temp.push(row);
            }
            return temp;
        }
    };

    sortBySinger=()=>{
        let sorted = {};
        let unsorted = this.state.songs;
        console.log(Object.keys(unsorted));
        /*Object.keys(unsorted).sort().forEach(function(key) {
            sorted[key] = unsorted[key];
        });
        this.setState({songs: sorted})*/
    }


    render() {
        return (
            <div className='songs'>
                <table>
                    <thead>
                        <tr>
                            <th onClick={this.sortBySinger}>Singer</th>
                            <th>Song</th>
                            <th>Year</th>
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