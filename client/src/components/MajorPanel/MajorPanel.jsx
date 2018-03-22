import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CourseList from '../CourseList/CourseList';

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class MajorPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: "computer science",
            requirements: [],
            items: getItems(5)
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

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items,
        });
    }

    render() {
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <CourseList items={this.state.items} />
                </DragDropContext>

                {/* <h3>{this.state.major}</h3>
                <div>
                {this.state.requirements.map((requirement) => {
                    return requirement.courses.map((course) => <p key={course.title}>{course.title}</p>);
                })}
                </div> */}
            </div>
        )
    }
}

export default MajorPanel;