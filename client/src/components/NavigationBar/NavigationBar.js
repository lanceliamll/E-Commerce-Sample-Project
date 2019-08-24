import { Component, Fragment } from 'inferno';
import { connect } from 'inferno-redux';
import { Link } from 'inferno-router';
import { logoutUser } from '../../actions/authAction';

class NavigationBar extends Component {
  handleLogoutUser = e => {
    e.preventDefault();
    const confirmLogout = window.confirm('Are you sure you want to logout?');

    if (confirmLogout) {
      this.props.logoutUser();
      window.location.reload();
    }
  };

  render(props) {
    const adminLinks = (
      <Fragment>
        <li class="nav-item">
          <Link class="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
      </Fragment>
    );

    const authLinks = (
      <Fragment>
        <li class="nav-item">
          <Link class="nav-link">Home</Link>
        </li>

        {/* If the user is admin */}
        {props.auth.user !== null && props.auth.user.isAdmin
          ? adminLinks
          : null}

        <li class="nav-item">
          <Link class="nav-link" onClick={this.handleLogoutUser}>
            Logout
          </Link>
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li class="nav-item">
          <Link class="nav-link" to="/signup">
            Signup
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/signin">
            Signin
          </Link>
        </li>
      </Fragment>
    );

    return (
      <Fragment>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand" to="/">
            E-Comerz
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              {/* Render Links based on the auth */}
              {props.auth.isAuthenticated ? authLinks : guestLinks}
            </ul>
            <span class="navbar-text" />
          </div>
        </nav>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavigationBar);
