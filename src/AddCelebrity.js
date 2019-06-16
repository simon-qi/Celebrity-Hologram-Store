import React from 'react'
import { Form, Field } from 'react-final-form'
import { Redirect } from "react-router-dom";
import Styles from './Styles'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Link } from 'react-router-dom'
import { authHeader } from './auth-header';


class AddCelebrity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.privilege === 'READ') {
      return <Redirect to='/login' />
    }

    const onSubmit = async values => {
      fetch('/api/add', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(values)
      }).then(response => this.setState({submitted: true}));
    };

    if (this.state.submitted === true) {
      return <Redirect to='/' />
    }

    return <Styles><h1>Add Celebrity</h1><Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name&nbsp;</label>
          <Field name="name" component="input" placeholder="Name" />
        </div>

        <div>
          <label>Age&nbsp;</label>
          <Field name="age" component="input" placeholder="Age" />
        </div>

        <div>
          <label>Occupation&nbsp;</label>
          <Field name="occupation" component="input" placeholder="Occupation" />
        </div>

        <div>
          <label>Price&nbsp;</label>
          <Field name="price" component="input" placeholder="Price" />
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
export default AddCelebrity
