import React, { Component } from 'react';
import './CourseListHeader.css';

class CourseListHeader extends Component {
    render() {
        return (
            <div className="CourseListHeader">
                {`Year ${this.props.year} ${this.props.quarter.toUpperCase()}`}
            </div>
        )
    }
}

export default CourseListHeader;