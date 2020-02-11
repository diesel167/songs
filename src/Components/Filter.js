import React, {Component} from 'react';



class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songsOrigin: this.props.songsOrigin.slice(),  //remember initial songs array  //вынести в основной коммпонент
            songs: this.props.songsOrigin,
            uniqueNames:'',
            uniqueYears:'',
            filterByName:'',
            filterByYear:''
        };
    }

    static getDerivedStateFromProps(props, state){
        if(props.songs!==state.songs){
            return {
                songsOrigin: props.songsOrigin.slice(),
                songs: props.songsOrigin
            };
        }
    }



    generateUniqueNames = () => {
        if(this.state.songsOrigin){
            let uniqueNames = this.state.songsOrigin;


            // переделать фильтр с доп массивом
            function onlyUnique(value, index, self) {
                return self.indexOf(self.artist) === index;
            }
            console.log(uniqueNames);
            uniqueNames.filter(onlyUnique);
            //this.setState({uniqueNames: uniqueNames});
            let listNames = [];
            uniqueNames.map(song => {
                listNames.push(<option value={song.artist}>{song.artist}</option>)
            });

            return listNames;
        }
    };

    generateUniqueYears = () => {
        let uniqueNames = this.state.songsOrigin;
        function onlyUnique(value, index, self) {
            return self.artist.indexOf(value) === index;
        }
        uniqueNames.filter(onlyUnique);
        this.setState({uniqueNames: uniqueNames})
    };
    filterByYear = (e) => {
        console.log(this.state.songsOrigin);
        console.log(e.target.value);
    };

    handleChange = () => {

    };

    render() {

        return (
            <div className='filter'>
                <select onChange={this.generateUniqueNames} size="1">
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                {this.generateUniqueNames()}
            </div>
        );
    }
}

export default Filter;