import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

class App extends React.Component {
    render() {
        return (
            <PrivateRoute exact path="/" component={HomePage} />
        );
    }
}

export default App;
