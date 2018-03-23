import React, { Component } from 'react';

class CourseDetailBody extends Component {
    render() {
        return (
            <div className="CourseDetailBody">
                <p>Description:</p>
                <p>{this.props.course.description}</p>
                {this.props.course.prerequisiteDescription ?
                    <div>
                        <p>Prerequisites:</p>
                        <p>{this.props.course.prerequisiteDescription}</p>
                    </div> : ''}
            </div>
        )
    }
}

export default CourseDetailBody;