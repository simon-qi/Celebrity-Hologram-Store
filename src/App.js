import React from 'react';

import HomePage from './HomePage';
import { Redirect } from "react-router-dom";

class App extends React.Component {
    render() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        return <Redirect to={{
              pathname: '/login',
              state: { message: null }
          }}  />
      }

      return (
          <HomePage />
      );
    }
}

export default App;
