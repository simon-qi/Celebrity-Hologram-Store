import React from 'react';

import { PrivateRoute } from './PrivateRoute';
import HomePage from './HomePage';

class App extends React.Component {
    render() {
        return (
            <PrivateRoute exact path="/" component={HomePage} />
        );
    }
}

export default App;
