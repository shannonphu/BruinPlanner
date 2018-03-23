import React, { Component } from 'react';
import { CourseList } from '..';
import { Row, Col } from 'antd';
import './InteractiveGrid.css';

class InteractiveGrid extends Component {
    render() {
        return (
            <div className="InteractiveGrid">
                <Row gutter={24}>
                    {Object.keys(this.props.columns).map((key, i) => {
                        let keyTokens = key.split("-");
                        let year = parseInt(keyTokens[0], 10);
                        let quarter = keyTokens[1];
                        return <Col xs={6} key={i}>
                            <CourseList key={i} year={year} quarter={quarter} items={this.props.columns[key]} />
                        </Col>
                    })}
                </Row>
            </div>
        )
    }
}

export default InteractiveGrid;