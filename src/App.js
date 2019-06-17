import React from 'react';

import HomePage from './HomePage';
import { Redirect } from "react-router-dom";
import AdminPage from './admin/AdminPage';

class App extends React.Component {
    render() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        return <Redirect to={{
              pathname: '/login',
              state: { message: null }
          }}  />
      }

      if (user.privilege === 'SUPERUSER') {
        return (
          <AdminPage />
        );
      }

      return (
          <HomePage />
      );
    }
}

export default App;
