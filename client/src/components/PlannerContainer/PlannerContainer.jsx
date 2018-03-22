import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col } from 'antd';
import { CourseRepository, InteractiveGrid } from '..';
import { reorderCourses, getItems, shouldUpdateStateAfterDrag } from './utils';
import { YEARS, QUARTERS, NUM_COURSES_PER_QUARTER } from './const';

class PlannerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: "computer science",
            requirements: [],
            courses: getItems(YEARS, QUARTERS, NUM_COURSES_PER_QUARTER),
            years: YEARS,
            quarters: QUARTERS,
            numCoursePerQuarter: NUM_COURSES_PER_QUARTER,
            columns: {}
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
                this.setState({ requirements });
            });
    }

    onDragEnd = (result) => {
        if (shouldUpdateStateAfterDrag(result)) {
            const data = reorderCourses({
                columns: this.state.courses,
                source: result.source,
                destination: result.destination
            });

            this.setState({
                courses: data.columns
            });
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Row>
                    <Col xs={6}><CourseRepository courses={this.state.courses} {...this.props} /></Col>
                    <Col xs={18}><InteractiveGrid columns={this.state.courses} {...this.props} /></Col>
                </Row>
            </DragDropContext>
        )
    }
}

export default PlannerContainer;