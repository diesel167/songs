import React, {Component} from 'react';



class Songs extends Component {
    constructor() {
        super();
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
            });
    }

    rows=()=>{
        //temp container for songs
        let temp = [];
        if(this.state.isAllSongsLoaded){
            for(let i = 0; i < this.props.songsPerPage; i++){
                let row=<tr>
                    <td>{this.state.songs[i].artist}</td>
                    <td>{this.state.songs[i].title}</td>
                    <td>{this.state.songs[i].year}</td>
                </tr>;
                temp.push(row);
            }
            return temp;
        }
    };


    render() {
        return (
            <div className='songs'>
                <table>
                    <thead>
                        <tr>
                            <th>Singer</th>
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