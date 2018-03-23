import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col } from 'antd';
import { CourseRepository, InteractiveGrid } from '..';
import { moveWithinGrid, getItems, getGridColumns, shouldUpdateStateAfterDrag } from './utils';

class PlannerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: "computer science",
            requirements: [],
            courses: getItems(),
            columns: getGridColumns()
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
            const { columns, courses } = moveWithinGrid({
                courses: this.state.courses,
                columns: this.state.columns,
                source: result.source,
                destination: result.destination
            });

            this.setState({
                courses, columns
            });
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Row>
                    <Col xs={6}><CourseRepository {...this.props} courses={this.state.courses} /></Col>
                    <Col xs={18}><InteractiveGrid columns={this.state.columns} {...this.props} /></Col>
                </Row>
            </DragDropContext>
        )
    }
}

export default PlannerContainer;