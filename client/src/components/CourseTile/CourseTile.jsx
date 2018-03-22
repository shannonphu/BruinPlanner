import React, { Component } from 'react';

class CourseTile extends Component {
    render() {
        return (
            <div>{this.props.title}</div>
        )
    }
}

export default CourseTile;