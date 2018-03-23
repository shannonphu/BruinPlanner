import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

class Nav extends Component {
    render() {
        return (
            <Header style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">BruinPlanner</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default Nav;