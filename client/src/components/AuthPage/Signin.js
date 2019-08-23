import { Component } from 'inferno';
import { connect } from 'inferno-redux';
import FormButton from '../FormButton/FormButton';
import FormInput from '../FormInput/FormInput';
import { signinUser } from '../../actions/authAction';

class Signin extends Component {
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

    let loginUser = {
      email,
      password
    };
    this.props.signinUser(loginUser);
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
        <h1>Signin Component</h1>
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
          <FormButton onClick={this.handleSigninClick}>Sign in</FormButton>
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
  { signinUser }
)(Signin);
