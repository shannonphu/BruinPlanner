import React, { Component } from 'react';
import { Nav, MyComponent } from '../'
import { Route, Switch } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        props.getAllDegreeRequirements();        
    }

    render() {
        return (
            <div>
                <Nav />

                {/*Alternate pages beneath navbar, based on current route*/}
                <Switch>
                    <Route exact path='/' render={() => <MyComponent {...this.props} />} />
                    <Route path='/test' render={() => <MyComponent {...this.props} />} />
                </Switch>
            </div>
        )
    }
}

export default Main;
