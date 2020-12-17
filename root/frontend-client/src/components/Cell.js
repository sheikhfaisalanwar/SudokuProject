import React from 'react';
import {localHostUrl} from "../constants";
import API from '../api/api';

class Cell extends React.Component {
    state = {
        cells: []
    }

    componentDidMount() {
        API.get('/getDefaultBoard')
            .then(res => {
                const cells = res.data["Cells"];
                console.log(cells)
                this.setState({cells}, () => console.log(this.state.cells));
        })
    }

    render() {
        const data = this.state.cells
        return (
            <div>
                {data.map(function(d, idx){
                    return (<li key={d.position}>{d.value}</li>)
                })}
            </div>
        );
    }
}
export default Cell;