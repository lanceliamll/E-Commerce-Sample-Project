import { Component } from 'inferno';
import { Provider } from 'inferno-redux';
import { BrowserRouter as Router, Route, Switch } from 'inferno-router';
import store from './store';
import './App.css';
import Signin from './components/AuthPage/Signin';
import Signup from './components/AuthPage/Signup';
import { loadUser } from './actions/authAction';
import setAuthToken from './helpers/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  //If there is currently token in the LS, load the user
  componentDidMount() {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />

            {/* Implement Authenticated Routes */}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
