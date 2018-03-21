import React, { Component } from 'react';

class MajorPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: "computer science",
            requirements: []
        };
        props.getCoursesForMajor(this.state.major)
            .then(() => {
                return this.props.requirements[this.state.major].map(requirement => {
                    let courses = requirement.courses.map(courseTitle => {
                        let courseTitleTokens = courseTitle.split(" ");
                        let deptAbbrev = courseTitleTokens.slice(0, courseTitleTokens.length - 1).join(" ");
                        let courseInfo = this.props.courses[deptAbbrev][courseTitle];
                        // TODO: find a better solution for this 
                        courseInfo["title"] = courseTitle;
                        return courseInfo;
                    });

                    return {
                        ...requirement,
                        courses
                    }
                });
            })
            .then(requirements => {
                this.setState({requirements});
                console.log(this.state);
            });
    }

    render() {
        return (
            <div>
                <h3>{this.state.major}</h3>
                <div>
                {this.state.requirements.map((requirement) => {
                    return requirement.courses.map((course) => <p key={course.title}>{course.title}</p>);
                })}
                </div>
            </div>
        )
    }
}

export default MajorPanel;