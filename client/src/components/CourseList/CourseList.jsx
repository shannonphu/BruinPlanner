import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCourseTile from '../DraggableCourseTile/DraggableCourseTile';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 5,
    minHeight: 250,
    width: 250,
    transition: 'background-color 0.5s ease, opacity 0.5s ease'
});

class CourseList extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <Droppable droppableId={this.props.title}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
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