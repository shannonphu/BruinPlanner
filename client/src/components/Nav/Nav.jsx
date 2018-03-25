import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

class Nav extends Component {
    render() {
        return (
            <Header style={{ position: 'fixed', width: '100%', zIndex: 1, backgroundColor: '#8EC9C2' }}>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', backgroundColor: '#8EC9C2' }}
                >
                    <Menu.Item key="1">BruinPlanner</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default Nav;