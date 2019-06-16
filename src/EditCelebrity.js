import React from 'react'
import { Form, Field } from 'react-final-form'
import { Redirect } from "react-router-dom";
import Styles from './Styles'
import { Link } from 'react-router-dom'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { authHeader } from './auth-header';


class EditCelebrity extends React.Component {
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
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.privilege === 'READ') {
      return <Redirect to='/login' />
    }
    const onSubmit = async values => {
      fetch('/api/edit?id=' + this.state.celebrity.id, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(values)
      }).then(response => this.setState({submitted: true}));
    };

    if (this.state.submitted === true) {
      return <Redirect to='/' />
    }

    return <Styles><h1>Edit Celebrity</h1><Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name&nbsp;</label>
          <Field name="name" component="input" placeholder="Name" defaultValue={this.state.celebrity.name}/>
        </div>

        <div>
          <label>Age&nbsp;</label>
          <Field name="age" component="input" placeholder="Age" defaultValue={this.state.celebrity.age}/>
        </div>

        <div>
          <label>Occupation&nbsp;</label>
          <Field name="occupation" component="input" placeholder="Occupation" defaultValue={this.state.celebrity.occupation}/>
        </div>

        <div>
          <label>Price&nbsp;</label>
          <Field name="price" component="input" placeholder="Price" defaultValue={this.state.celebrity.price}/>
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
export default EditCelebrity
