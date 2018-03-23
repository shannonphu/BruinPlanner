import React, { Component } from 'react';
import './CourseTile.css';

class CourseTile extends Component {
    render() {
        return (
            <div className="CourseTile">
                <div className="id">{this.props.course.id}</div>
                <div className="title">{this.props.course.title}</div>
            </div>
        )
    }
}

export default CourseTile;