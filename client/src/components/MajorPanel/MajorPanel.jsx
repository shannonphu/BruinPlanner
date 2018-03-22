import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CourseList from '../CourseList/CourseList';

// fake data generator
const getItems = (columns, countPerColumn) => {
    let result = {};
    for (let i = 0; i < columns; i++) {
        result[`${i}`] = Array.from({ length: countPerColumn }, (v, k) => k).map(k => ({
            id: `col-${i}-item-${k}`,
            content: `col-${i}-item ${k}`,
        }));
    }
    return result;
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const reorderQuoteMap = ({ quoteMap, source, destination }) => {
    const current = [...quoteMap[source.droppableId]];
    const next = [...quoteMap[destination.droppableId]];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(
            current,
            source.index,
            destination.index,
        );
        const result = {
            ...quoteMap,
            [source.droppableId]: reordered,
        };
        return {
            quoteMap: result,
            // not auto focusing in own list
            autoFocusQuoteId: null,
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const result = {
        ...quoteMap,
        [source.droppableId]: current,
        [destination.droppableId]: next,
    };

    return {
        quoteMap: result,
        autoFocusQuoteId: target.id,
    };
};


class MajorPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: "computer science",
            requirements: [],
            columns: getItems(3, 5)
        };
        this.onDragEnd = this.onDragEnd.bind(this);

        // props.getCoursesForMajor(this.state.major)
        //     .then(() => {
        //         return this.props.requirements[this.state.major].map(requirement => {
        //             let courses = requirement.courses.map(courseTitle => {
        //                 let courseTitleTokens = courseTitle.split(" ");
        //                 let deptAbbrev = courseTitleTokens.slice(0, courseTitleTokens.length - 1).join(" ");
        //                 let courseInfo = this.props.courses[deptAbbrev][courseTitle];
        //                 // TODO: find a better solution for this 
        //                 courseInfo["title"] = courseTitle;
        //                 return courseInfo;
        //             });

        //             return {
        //                 ...requirement,
        //                 courses
        //             }
        //         });
        //     })
        //     .then(requirements => {
        //         this.setState({requirements});
        //     });
    }

    onDragEnd = (result) => {
        // dropped nowhere
        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        // did not move anywhere - can bail early
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) {
            return;
        }

        const data = reorderQuoteMap({
            quoteMap: this.state.columns,
            source,
            destination,
        });

        this.setState({
            columns: data.quoteMap
        });
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                    {Object.keys(this.state.columns).map((key, i) => {
                        return <CourseList key={i} title={key} items={this.state.columns[key]} />
                    })}
                </div>
            </DragDropContext>
        )
    }
}

export default MajorPanel;