import React, {Component} from 'react';



class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songsOrigin: this.props.songsOrigin,  //remember initial songs array
            uniqueNames:'',
            uniqueYears:'',
            filterByName:'',
            filterByYear:'',
            gotOriginSongsBase: false
        };
    }

    static getDerivedStateFromProps(props, state){
        //to prevent mutation of songsOrigin in future state update
        if(props.songsOrigin!==state.songsOrigin && !state.gotOriginSongsBase){
            return {
                songsOrigin: props.songsOrigin,
                gotOriginSongsBase: true
            };
        }
        return null;
    }

    handleFilterName = (e) => {
        this.setState({filterByName: e.target.value});
        let tempArr = this.state.songsOrigin;
        //if double filtering
        if(this.state.filterByYear && this.state.filterByYear!=='_All_'){
            tempArr = tempArr.filter(song => song.year === this.state.filterByYear);
        }
        //send to Songs filtered by artist name songs array
        //if 'All' filtered
        if(e.target.value === '_All_'){
            this.props.filteredSongs(tempArr);
        }
        //if filtered not All
        else{
            this.props.filteredSongs(tempArr.filter(song => song.artist === e.target.value));
        }
    };

    generateUniqueNames = () => {
        if(this.state.songsOrigin){
            let notUniqueSongs = this.state.songsOrigin;
            let uniqueNames = [];
            notUniqueSongs.map(song => {
                if(uniqueNames.indexOf(song.artist)<0){
                    uniqueNames.push(song.artist);
                }
                return 0;
            });
            //sort it by asc
            uniqueNames.sort(function(a, b){
                if(a < b) { return -1; }
                if(a > b) { return 1; }
                return 0;
            });
            let listNames = [];
            listNames.push(<option key={100000} value='_All_'>All</option>);
            uniqueNames.map((name, i) => {
                listNames.push(<option key={i*uniqueNames.length} value={name}>{name}</option>);
                return 0;
            });
            return <>Singer:<select onChange={this.handleFilterName} size="1">{listNames}</select></>;
        }
    };

    handleFilterYear = (e) => {
        this.setState({filterByYear: e.target.value});
        let tempArr = this.state.songsOrigin;
        //if double filtering
        if(this.state.filterByName && this.state.filterByName!=='_All_'){
            tempArr = tempArr.filter(song => song.artist === this.state.filterByName);
        }
        //send to Songs filtered by year songs array
        //if 'All' filtered
        if(e.target.value === '_All_'){
            this.props.filteredSongs(tempArr);
        }
        //if filtered not All
        else{
            this.props.filteredSongs(tempArr.filter(song => song.year === e.target.value));
        }
    };

    generateUniqueYears = () => {
        if(this.state.songsOrigin){
            let notUniqueSongs = this.state.songsOrigin;
            let uniqueYears = [];
            notUniqueSongs.map(song => {
                if(uniqueYears.indexOf(song.year)<0){
                  uniqueYears.push(song.year);
                }
                return 0;
            });
            //sort it by asc
            uniqueYears.sort(function(a, b){
                if(a < b) { return -1; }
                if(a > b) { return 1; }
                return 0;
            });
            let listYears = [];
            listYears.push(<option key={100001} value='_All_'>All</option>);
            uniqueYears.map((year, i) => {
                listYears.push(<option key={i*uniqueYears.length} value={year}>{year}</option>);
                return 0;
            });
            return <>Year:<select onChange={this.handleFilterYear} size="1">{listYears}</select></>;
        }
    };

    render() {
        return (
            <div className='filter'>
                {this.generateUniqueNames()}
                {this.generateUniqueYears()}
            </div>
        );
    }
}

export default Filter;