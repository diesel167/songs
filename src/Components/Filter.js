import React, {Component} from 'react';
import Songs from "./Songs";



class Filter extends Component {
    render() {
        return (
            <div className='filter'>
                <select size="1">
                    <option value=''>1</option>
                    <option value=''>2</option>
                    <option value=''>3</option>
                </select>
            </div>
        );
    }
}

export default Filter;