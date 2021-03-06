import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col } from 'antd';
import { CourseRepository, InteractiveGrid } from '..';
import { moveWithinGrid, getGridColumns, shouldUpdateStateAfterDrag } from './utils';

class PlannerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: props.match.params.major,
            courses: [],
            columns: getGridColumns()
        };

        props.getCoursesForMajor(this.state.major)
            .then(requirements => {
                let courses = requirements.map((requirement, i) => {
                    return requirement.courses
                }).reduce((pre, curr) => {
                    return pre.concat(curr);
                });

                this.setState({ courses });
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
                <Row type="flex" justify="center" gutter={8}>
                    <Col xs={4}><CourseRepository {...this.props} courses={this.state.courses} /></Col>
                    <Col xs={16}><InteractiveGrid {...this.props} columns={this.state.columns} /></Col>
                </Row>
            </DragDropContext>
        )
    }
}

export default PlannerContainer;