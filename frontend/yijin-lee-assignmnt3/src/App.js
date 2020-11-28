import React, { Component } from 'react';
import Home from './home';
import EditUrl from './editUrl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route
                        path="/api/shorterUrl/:urlcode/edit"
                        exact
                        component={EditUrl}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
