import React, { Component } from 'react';
import { Nav, LandingContainer, PlannerContainer } from '..'
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;

class Main extends Component {
    render() {
        return (
            <div>
                <Nav />

                <Content style={{ paddingTop: 64 }}>
                    <Switch>
                        <Route path='/:major' render={(props) => <PlannerContainer {...this.props} {...props} />} />
                        <Route path='/' component={LandingContainer} />                        
                    </Switch>
                </Content>
            </div>
        )
    }
}

export default Main;
