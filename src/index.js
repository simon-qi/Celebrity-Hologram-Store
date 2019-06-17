import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AddCelebrity from './AddCelebrity';
import EditCelebrity from './EditCelebrity';
import ViewCelebrity from './ViewCelebrity';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AddUser from './admin/AddUser';
import EditUser from './admin/EditUser';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/store" component={HomePage} />
      <Route path="/add" component={AddCelebrity} />
      <Route path="/edit/:id" component={EditCelebrity} />
      <Route path="/view/:id" component={ViewCelebrity} />
      <Route path="/adduser" component={AddUser} />
      <Route path="/edituser/:id" component={EditUser} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
