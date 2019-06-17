import React from 'react';
import './AdminPage.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { authHeader } from '../auth-header';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/users/list', {
      method: 'GET',
      headers: authHeader()
    }).then(response => response.json())
      .then(state => this.setState({users: state}));
  }


  handleDelete(id) {
    fetch('/users/delete?id=' + id, {
      method: 'DELETE',
      headers: authHeader()
    }).then(response =>
      fetch(`/users/list`, {
        method: 'GET',
        headers: authHeader()
      }).then(response => response.json())
        .then(state => this.setState({users: state})));
  }

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id', // String-based value accessors!
      id: 'id'
    },
    {
      Header: 'Username',
      accessor: 'username'
    },
    {
      Header: 'Privilege',
      accessor: 'privilege' // String-based value accessors!
    }]

    let user = JSON.parse(localStorage.getItem('user'));
    if (user.privilege !== 'READ') {
      columns.push({
        id: 'delete',
        accessor: 'id',
        Cell: ({value}) => (<Button variant="danger" onClick={() => this.handleDelete(value)}>Delete</Button>)
      });
      columns.push({
        id: 'edit',
        accessor: 'id',
        Cell: ({value}) => (<Link to={'/edituser/' + value}><Button variant="primary">Edit</Button></Link>)
      });
    }

    const onSubmit = async values => {
      fetch(`/users/get?id=` + values.search, {
        method: 'GET',
        headers: authHeader()
      }).then(response => response.json())
        .then(state => this.setState({users: state}));
    };

    const showAll = () => {
      fetch(`/users/list`, {
        method: 'GET',
        headers: authHeader()
      }).then(response => response.json())
        .then(state => this.setState({users: state}));
    }

    const mustBeNumber = value => (isNaN(value) || value % 1 !== 0  ? 'Must be a number' : undefined);

    return (
      <div className="home-page">
        <div className="logout">
          <Link to="store">Go To Store</Link>
          &nbsp;&nbsp;&nbsp;
          <Link to={{
                pathname: '/login',
                state: { message: null }
            }}>Logout</Link>
        </div>
        <h1>User Maintenance Page</h1>
        <div><br></br></div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Id&nbsp;</label>
                <Field name="search" component="input" placeholder="Id" validate={mustBeNumber}/>
                &nbsp;
                <button type="submit" disabled={pristine || invalid}>
                  Search
                </button>
                &nbsp;
              </div>


            </form>
          )}
        />
        <button onClick={() => showAll()}>Show All</button>
        {user.privilege !== 'READ' ? <ButtonToolbar className="add-button">
          <Link to="/adduser">
            <Button variant="primary">Add User</Button>
          </Link>
        </ButtonToolbar> : null}
        <div><br></br></div>
        <ReactTable
          data={this.state.users}
          columns={columns}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default AdminPage;
