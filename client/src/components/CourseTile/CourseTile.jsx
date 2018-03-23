import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import { CourseDetailHeader, CourseDetailBody } from '..';
import { Row, Col } from 'antd';
import './CourseTile.css';

class CourseTile extends Component {
    render() {
        return (
            <div className="CourseTile">
                <Row align="middle">
                    <Col xs={20} className="id">{this.props.course.id}</Col>
                    <Col xs={4}>
                        <Popover 
                            placement="bottom" 
                            title={<CourseDetailHeader course={this.props.course} />} 
                            content={<CourseDetailBody course={this.props.course} />} 
                            trigger={["click", "hover"]} 
                        >
                            <Button shape="circle" icon="info" size="small" />
                        </Popover>
                    </Col>
                </Row>
                <div className="title">{this.props.course.title}</div>
            </div>
        )
    }
}

export default CourseTile;