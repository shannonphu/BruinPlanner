import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CourseTile from '../CourseTile/CourseTile';

const getItemStyle = (isDragging, draggableStyle) => ({
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
                            <CourseTile course={this.props.item} />
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        )
    }
}

export default DraggableCourseTile;