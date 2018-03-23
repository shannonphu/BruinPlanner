import React, { Component } from 'react';

class CourseDetailBody extends Component {
    render() {
        return (
            <div className="CourseDetailBody">
                <b>Description:</b>
                <p>{this.props.course.description}</p>
                {this.props.course.prerequisiteDescription ?
                    <div>
                        <b>Prerequisites:</b>
                        <p>{this.props.course.prerequisiteDescription}</p>
                    </div> : ''}
                {this.props.course.corequisiteDescription ?
                    <div>
                        <b>Corequisites:</b>
                        <p>{this.props.course.corequisiteDescription}</p>
                    </div> : ''}
            </div>
        )
    }
}

export default CourseDetailBody;