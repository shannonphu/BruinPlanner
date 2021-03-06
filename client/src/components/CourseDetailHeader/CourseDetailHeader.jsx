import React, { Component } from 'react';
import { Row, Col } from 'antd';

class CourseDetailHeader extends Component {
    render() {
        return (
            <div className="CourseDetailHeader">
                <Row>
                    <Col xs={20}>{this.props.course.id}</Col>
                    <Col xs={4}>Units: {this.props.course.unit}</Col>
                </Row>
                <div>{this.props.course.title}</div>
            </div>
        )
    }
}

export default CourseDetailHeader;