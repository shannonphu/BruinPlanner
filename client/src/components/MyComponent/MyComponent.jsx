import React, { Component } from 'react';

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        props.getCoursesForMajor("computer science");
    }

    render() {
        return (
            <div>
                <h3>MyComponent</h3>
                <div>{"computer science" in this.props.courses ? Object.keys(this.props.courses["computer science"]).map((courseId, index) => <p key={index}>{this.props.courses["computer science"][courseId].title}</p>) : ''}</div>
            </div>
        )
    }
}

export default MyComponent;
