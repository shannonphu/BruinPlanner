import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './Nav.css';

class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <Row>
                    <a href="/"><Col span={3} offset={2} className="logo">BruinPlanner</Col></a>
                </Row>
            </nav>
        )
    }
}

export default Nav;