import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CourseList } from '..';
import { REPOSITORY_ID } from '..';

class CourseRepository extends Component {
    render() {
        return (
            <div>
                <Droppable droppableId={REPOSITORY_ID}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            <CourseList title="CourseRepository" items={this.props.courses} {...this.props} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>)
    }
}

export default CourseRepository;