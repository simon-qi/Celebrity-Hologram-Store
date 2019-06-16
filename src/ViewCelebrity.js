import React from 'react'
import { Form, Field } from 'react-final-form'
import Styles from './Styles'
import { Link } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import { authHeader } from './auth-header';


class ViewCelebrity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      celebrity: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/api/get?id=` + id, {
      method: 'GET',
      headers: authHeader()
    }).then(response => response.json())
      .then(state => this.setState({celebrity: state[0]}));
  }

  render() {
    if (!localStorage.getItem('user')) {
      return <Redirect to='/login' />
    }

    return <Styles><h1>View Celebrity</h1><Form
    onSubmit={() => {}}
    render={({ handleSubmit, pristine, invalid }) => (
      <form>
        <div>
          <label>Name&nbsp;</label>
          <Field name="name" component="input" placeholder="Name" disabled="true" defaultValue={this.state.celebrity.name}/>
        </div>

        <div>
          <label>Age&nbsp;</label>
          <Field name="age" component="input" placeholder="Age" disabled="true" defaultValue={this.state.celebrity.age}/>
        </div>

        <div>
          <label>Occupation&nbsp;</label>
          <Field name="occupation" component="input" placeholder="Occupation" disabled="true" defaultValue={this.state.celebrity.occupation}/>
        </div>

        <div>
          <label>Price&nbsp;</label>
          <Field name="price" component="input" placeholder="Price" disabled="true" defaultValue={this.state.celebrity.price}/>
        </div>

        <Link to="/">
          <button type="submit">
            Back
          </button>
        </Link>

      </form>
    )}/></Styles>
  }
}
export default ViewCelebrity
