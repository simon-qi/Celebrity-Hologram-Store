import React from 'react'
import { Form, Field } from 'react-final-form'
import { Redirect } from "react-router-dom";
import Styles from '../Styles'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Link } from 'react-router-dom'
import { authHeader } from '../auth-header';


class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      user: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/users/get?id=` + id, {
      method: 'GET',
      headers: authHeader()
    }).then(response => response.json())
      .then(state => this.setState({user: state[0]}));
  }

  render() {

    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return <Redirect to={{
            pathname: '/login',
            state: { message: null }
        }}  />
    }

    if (user.privilege !== 'SUPERUSER') {
      return <Redirect to={{
            pathname: '/login',
            state: { message: 'You do not have permission to perform the action.' }
        }} />
    }

    const required = value => (value ? undefined : 'Required');

    const onSubmit = async values => {
      console.log(JSON.stringify(values));
      fetch('/users/edit?id=' + this.state.user.id, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(values)
      }).then(response => this.setState({submitted: true}));
    };

    if (this.state.submitted === true) {
      return <Redirect to='/' />
    }

    return <Styles><h1>Add User</h1><Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <Field name="username" validate={required} defaultValue={this.state.user.username}>
          {({ input, meta }) => (
            <div>
              <label>Username</label>
              <input {...input} type="text" placeholder="Username" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <Field name="password">
          {({ input, meta }) => (
            <div>
              <label>Password</label>
              <input {...input} type="password" placeholder="*********" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <div>
          <label>Privilege</label>
          <Field name="privilege" validate={required} component="select" defaultValue={this.state.user.privilege}>
            <option />
            <option value="READ">READ</option>
            <option value="READWRITE">READWRITE</option>
            <option value="SUPERUSER">SUPERUSER</option>
          </Field>
        </div>

        <ButtonToolbar>
          <button type="submit" disabled={pristine || invalid}>
            Submit
          </button>

          <Link to="/">
            <button type="submit">
              Back
            </button>
          </Link>
        </ButtonToolbar>
      </form>
    )}/></Styles>
  }
}
export default EditUser
