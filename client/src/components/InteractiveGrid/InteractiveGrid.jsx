import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { CourseList } from '..';
import { Row, Col } from 'antd';

const years = 5;
const quarters = ["Fall", "Winter", "Spring", "Summer"];
const numCoursePerQuarter = 4;

const getItems = (years, quarters, numCoursePerQuarter) => {
    let result = {};
    for (let year = 0; year < years; year++) {
        for (let quarter of quarters) {
            result[`${year}-${quarter}`] = Array.from({ length: numCoursePerQuarter }, (v, k) => k).map(k => ({
                id: `year-${year}-quarter-${quarter}-${k}`,
                content: `year-${year}-quarter-${quarter}-${k}`,
            }));
        }
    }
    return result;
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const reorderCourses = ({ columns, source, destination }) => {
    const current = [...columns[source.droppableId]];
    const next = [...columns[destination.droppableId]];
    const target = current[source.index];

    let result = null;

    // Tile was moved within the same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(
            current,
            source.index,
            destination.index,
        );
        
        result = {
            ...columns,
            [source.droppableId]: reordered,
        };
    } 
    // Tile was moved to different list
    else {
        // Remove from original and insert into next
        current.splice(source.index, 1);
        next.splice(destination.index, 0, target);

        result = {
            ...columns,
            [source.droppableId]: current,
            [destination.droppableId]: next,
        };
    }

    return {
        columns: result
    };
};

class InteractiveGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: "computer science",
            requirements: [],
            columns: getItems(years, quarters, numCoursePerQuarter),
            years,
            quarters,
            numCoursePerQuarter
        };

        // this.onDragEnd = this.onDragEnd.bind(this);

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
        // Tile was not dropped anywhere
        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        // Time did not move anywhere - can bail early
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) {
            return;
        }

        const data = reorderCourses({
            columns: this.state.columns,
            source,
            destination
        });

        this.setState({
            columns: data.columns
        });
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