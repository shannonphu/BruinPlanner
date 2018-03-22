import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { CourseList } from '..';
import { Row, Col } from 'antd';
import { reorderCourses, getItems, shouldUpdateStateAfterDrag } from './utils';
import { YEARS, QUARTERS, NUM_COURSES_PER_QUARTER } from './const';

class InteractiveGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: "computer science",
            requirements: [],
            columns: getItems(YEARS, QUARTERS, NUM_COURSES_PER_QUARTER),
            years: YEARS,
            quarters: QUARTERS,
            numCoursePerQuarter: NUM_COURSES_PER_QUARTER
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
            });
    }

    onDragEnd = (result) => {
        if (shouldUpdateStateAfterDrag(result)) {
            const data = reorderCourses({
                columns: this.state.columns,
                source: result.source,
                destination: result.destination
            });

            this.setState({
                columns: data.columns
            });
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                    <Row>
                        {Object.keys(this.state.columns).map((key, i) => {
                            return <Col xs={6} key={`${key}`}>
                                <CourseList key={i} title={key} items={this.state.columns[key]} />
                            </Col>
                        })}
                    </Row>
                </div>
            </DragDropContext>
        )
    }
}

export default InteractiveGrid;