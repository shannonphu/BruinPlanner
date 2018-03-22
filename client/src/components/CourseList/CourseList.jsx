import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCourseTile from '../DraggableCourseTile/DraggableCourseTile';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 5,
    width: 250,
});

class CourseList extends Component {
    render() {
        return (
            <Droppable droppableId="courses">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        {this.props.items.map((item, index) => (
                            <DraggableCourseTile key={index} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default CourseList;