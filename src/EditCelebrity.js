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
    if (!user) {
      return <Redirect to={{
            pathname: '/login',
            state: { message: null }
        }}  />
    }

    if (user.privilege === 'READ') {
      return <Redirect to={{
            pathname: '/login',
            state: { message: 'You do not have permission to perform the action.' }
        }} />
    }

    const backLink = user.privilege === 'SUPERUSER' ? '/store' : '/';
    const required = value => (value ? undefined : 'Required');
    const mustBeNumber = value => (isNaN(value) || value % 1 !== 0  ? 'Must be a number' : undefined);
    const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
    const regex = /^\$?[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    const isCurrency = value => (regex.test(value) ? undefined : 'Must be a currency amount');

    const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

    const onSubmit = async values => {
      fetch('/api/edit?id=' + this.state.celebrity.id, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(values)
      }).then(response => this.setState({submitted: true}));
    };

    if (this.state.submitted === true) {
      return <Redirect to={backLink} />
    }

    return <Styles><h1>Edit Celebrity</h1><Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
      <Field name="name" validate={required} defaultValue={this.state.celebrity.name}>
        {({ input, meta }) => (
          <div>
            {meta.error && meta.touched && <div class="errorMessage">{meta.error}</div>}
            <label>Name</label>
            <input {...input} type="text" placeholder="Name" />
          </div>
        )}
      </Field>

      <Field
         name="age"
         validate={composeValidators(required, mustBeNumber, minValue(0))}
         defaultValue={this.state.celebrity.age}
       >
         {({ input, meta }) => (
           <div>
             {meta.error && meta.touched && <div class="errorMessage">{meta.error}</div>}
             <label>Age</label>
             <input {...input} type="text" placeholder="Age" />
           </div>
         )}
       </Field>

      <Field name="occupation" validate={required} defaultValue={this.state.celebrity.occupation}>
        {({ input, meta }) => (
          <div>
            {meta.error && meta.touched && <div class="errorMessage">{meta.error}</div>}
            <label>Occupation</label>
            <input {...input} type="text" placeholder="Occupation" />
          </div>
        )}
      </Field>

      <Field
         name="price"
         validate={composeValidators(required, isCurrency)}
         defaultValue={this.state.celebrity.price}
       >
         {({ input, meta }) => (
           <div>
             {meta.error && meta.touched && <div class="errorMessage">{meta.error}</div>}
             <label>Price</label>
             <input {...input} type="text" placeholder="Price" />
           </div>
         )}
       </Field>
        <ButtonToolbar className="buttons">
          <button type="submit" disabled={pristine || invalid}>
            Submit
          </button>

          <Link to={backLink}>
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
