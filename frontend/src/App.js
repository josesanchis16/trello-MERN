import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import settings from './config/settings';

import { connect } from 'react-redux';

import store from './config/redux/store';

//Importacion de vistas
import Index from './Vistas/Index/Index';
import Login from './Vistas/Login/Login';
import Register from './Vistas/Register/Register';

//Importacion de estilos
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const token = localStorage.getItem('loginToken');
    const res = await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/users/getUser`, {
      token
    })
    console.log(res.data);
    try {
      const action = {
        type: 'LOGINTOKEN',
        payload: res.data
      }
      store.dispatch(action);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Register} />
          {/* <Route path="*" component={} /> */}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(App);
