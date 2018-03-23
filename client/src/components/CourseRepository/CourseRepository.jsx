import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CourseList } from '..';
import { REPOSITORY_ID } from '..';
import './CourseRepository.css';

class CourseRepository extends Component {
    render() {
        return (
            <div className="CourseRepository">
                <Droppable droppableId={REPOSITORY_ID}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            <CourseList items={this.props.courses} {...this.props} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default CourseRepository;