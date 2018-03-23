import React, { Component } from 'react';
import { CourseList } from '..';
import { Row, Col } from 'antd';

class InteractiveGrid extends Component {
    render() {
        return (
            <div>
                <Row>
                    {Object.keys(this.props.columns).map((key, i) => {        // console.log(props);
                        let keyTokens = key.split("-");
                        let year = parseInt(keyTokens[0], 10) + 1;
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