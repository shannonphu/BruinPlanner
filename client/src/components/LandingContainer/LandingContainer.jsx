import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { MajorCarousel, MajorTypeahead } from '..';
import './LandingContainer.css';

class LandingContainer extends Component {
    render() {
        return (
            <Row type="flex" justify="center" className="LandingContainer">
                <Col sm={12} md={6}>
                    <p className="question">What is your major?</p>
                    <MajorCarousel />
                </Col>
                <Col sm={12} md={18}>
                    <Row className="searchbox">
                        <Col xs={3} sm={2} lg={1}><Icon type="search" className="icon" /></Col>
                        <Col xs={21} sm={22} lg={23}>
                            <MajorTypeahead />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default LandingContainer;