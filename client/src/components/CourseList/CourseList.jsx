import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DraggableCourseTile, CourseListHeader, REPOSITORY_ID } from '..';
import { getListId } from '../PlannerContainer/utils';
import './CourseList.css';

const getListStyle = isDraggingOver => ({
});

class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            droppableId: this.props.year && this.props.quarter ? getListId(this.props.year, this.props.quarter) : REPOSITORY_ID
        }
    }
    render() {
        return (
            <div className="CourseList">
                {this.props.year && this.props.quarter ? 
                    <CourseListHeader year={this.props.year} quarter={this.props.quarter} /> : ''}
                <Droppable droppableId={this.state.droppableId}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} className="CourseList-tilelist" style={getListStyle(snapshot.isDraggingOver)}>
                            {this.props.items.map((item, index) => (
                                <DraggableCourseTile key={index} item={item} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default CourseList;