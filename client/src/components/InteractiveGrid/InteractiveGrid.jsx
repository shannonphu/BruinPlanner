import React, { Component } from 'react';
import { CourseList } from '..';
import { Row, Col } from 'antd';

class InteractiveGrid extends Component {
    render() {
        return (
            <div>
                <Row>
                    {Object.keys(this.props.columns).map((key, i) => {
                        return <Col xs={6} key={`${key}`}>
                            <CourseList key={i} title={key} items={this.props.columns[key]} />
                        </Col>
                    })}
                </Row>
            </div>
        )
    }
}

export default InteractiveGrid;