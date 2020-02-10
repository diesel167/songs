import React, {Component} from 'react';



class Songs extends Component {
    constructor() {
        super();
        this.state = {
            songs: ''
        };
    }

    componentDidMount() {
        fetch('https://api.myjson.com/bins/sml9c')
            .then(response => response.json())
            .then((a)=>{
                this.setState({songs: a.songs});
                console.log(JSON.stringify(a.songs))
            });

    }

    render() {
        return (
            <>
                <table>

                </table>

            </>
        );
    }
}

export default Songs;