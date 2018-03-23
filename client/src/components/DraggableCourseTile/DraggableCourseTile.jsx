import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CourseTile from '../CourseTile/CourseTile';

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 10,
    margin: `0 0 5px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgrey' : 'lightblue',
    transition: 'background-color 0.5s ease, opacity 0.5s ease',

    // styles we need to apply on draggables
    ...draggableStyle,
});

class DraggableCourseTile extends Component {
    render() {
        return (
            <Draggable key={this.props.item.id} draggableId={this.props.item.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <div>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                        >
                            <CourseTile title={this.props.item.id} />
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        )
    }
}

export default DraggableCourseTile;