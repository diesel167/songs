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
            let start = this.props.currentPage*this.props.songsPerPage-this.props.songsPerPage;
            let end = this.props.currentPage*this.props.songsPerPage > this.state.songs.length ? this.state.songs.length : this.props.currentPage*this.props.songsPerPage;
            console.log(end);
            [...this.state.songs].slice(start,end).map(song => {
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