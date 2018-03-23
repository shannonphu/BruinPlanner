import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DraggableCourseTile } from '..';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#eee' : 'white',
    padding: 5,
    minHeight: 250,
    width: '100%',
    transition: 'background-color 0.3s ease, opacity 0.3s ease'
});

class CourseList extends Component {
    render() {
        return (
            <div>
                {this.props.year && this.props.quarter ? 
                    <p>{`Year ${this.props.year} ${this.props.quarter}`}</p> : ''}
                <Droppable droppableId={`year${this.props.year}-quarter${this.props.quarter}`}>
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