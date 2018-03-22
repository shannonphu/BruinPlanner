import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';

class CourseRepository extends Component {
    render() {
        return (
            <div>
                <Droppable droppableId="CourseRepository">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            <div>CourseRepository</div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>)
    }
}

export default CourseRepository;