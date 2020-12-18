import React from 'react';

class Cell extends React.Component {
    render() {
        return (
            <button className="cell">
                {this.props.value}
            </button>
        );
    }
}
export default Cell;