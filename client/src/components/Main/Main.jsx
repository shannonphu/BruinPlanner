import React, { Component } from 'react';
import { Nav, InteractiveGrid } from '../'
import { Route, Switch } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div>
                <Nav />

                {/*Alternate pages beneath navbar, based on current route*/}
                <Switch>
                    <Route exact path='/' render={() => <InteractiveGrid {...this.props} />} />
                    <Route path='/test' render={() => <InteractiveGrid {...this.props} />} />
                </Switch>
            </div>
        )
    }
}

export default Main;
