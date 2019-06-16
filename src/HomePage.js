import React from 'react';
import logo from './logo.svg';
import './HomePage.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { authHeader } from './auth-header';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      celebrities: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/api/list', {
      method: 'GET',
      headers: authHeader()
    }).then(response => response.json())
      .then(state => this.setState({celebrities: state}));
  }


  handleDelete(id) {
    fetch('/api/delete?id=' + id, {
      method: 'DELETE',
      headers: authHeader()
    }).then(response =>
      fetch(`/api/list`, {
        method: 'GET',
        headers: authHeader()
      }).then(response => response.json())
        .then(state => this.setState({celebrities: state})));
  }

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id', // String-based value accessors!
      id: 'id'
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: row => <Link to={'/view/' + row.row.id}>{row.row.name}</Link>
    },
    {
      Header: 'Age',
      accessor: 'age' // String-based value accessors!
    },
    {
      Header: 'Occupation',
      accessor: 'occupation' // String-based value accessors!
    },
    {
      Header: 'Price',
      accessor: 'price' // String-based value accessors!
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
        Cell: ({value}) => (<Link to={'/edit/' + value}><Button variant="primary">Edit</Button></Link>)
      });
    }

    const onSubmit = async values => {
      fetch(`/api/get?id=` + values.search, {
        method: 'GET',
        headers: authHeader()
      }).then(response => response.json())
        .then(state => this.setState({celebrities: state}));
    };

    const showAll = () => {
      fetch(`/api/list`, {
        method: 'GET',
        headers: authHeader()
      }).then(response => response.json())
        .then(state => this.setState({celebrities: state}));
    }

    return (
      <div className="home-page">
        <div className="logout">
          <Link to="/login">Logout</Link>
        </div>
        <h1>Celebrity Hologram Store</h1>
        <div><br></br></div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Id&nbsp;</label>
                <Field name="search" component="input" placeholder="Id" />
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
          <Link to="/add">
            <Button variant="primary">Add Celebrity</Button>
          </Link>
        </ButtonToolbar> : null}
        <div><br></br></div>
        <ReactTable
          data={this.state.celebrities}
          columns={columns}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default HomePage;
