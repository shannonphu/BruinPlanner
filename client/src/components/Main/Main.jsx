import React, { Component } from 'react';
import { Nav, PlannerContainer } from '..'
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;

class Main extends Component {
    render() {
        return (
            <Layout>
                <Nav />

                <Content style={{ marginTop: 64, backgroundColor: 'white' }}>
                    <Switch>
                        <Route exact path='/' render={() => <PlannerContainer {...this.props} />} />
                        <Route path='/test' render={() => <PlannerContainer {...this.props} />} />
                    </Switch>
                </Content>
            </Layout>
        )
    }
}

export default Main;
