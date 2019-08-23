import { Component } from 'inferno';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { connect } from 'inferno-redux';
import { signupUser } from '../../actions/authAction';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    let userData = {
      email,
      password
    };
    this.props.signupUser(userData);
  };

  handleSigninClick = () => {
    console.log('Signed');
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Signup Component</h1>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            onInput={this.handleChange}
            name="email"
            value={this.state.email}
            placeholder="Enter Email"
          />
          <FormInput
            type="password"
            onInput={this.handleChange}
            name="password"
            value={this.state.password}
            placeholder="Enter Password"
          />
          <FormButton>Sign up</FormButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signupUser }
)(Signup);
