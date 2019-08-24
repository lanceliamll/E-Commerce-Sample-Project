import { connect } from 'inferno-redux';
import { Route, Redirect } from 'inferno-router';

const PrivateRoute = ({ component: Component, auth, ...otherRouteProps }) => {
  <Route
    {...otherRouteProps}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...otherComponentProps} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />;
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
