import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import settings from './config/settings';

import {
  connect
} from 'react-redux';

import store from './config/redux/store';

//Importacion de vistas
import Index from './Vistas/Index/Index';
import Login from './Vistas/Login/Login';
import Register from './Vistas/Register/Register';
import Boards from './Vistas/Boards/Boards';
import Lists from './Vistas/Lists/Lists';

//Importacion de estilos
import './App.css';

class App extends React.Component {

  async componentDidMount() {
    const token = localStorage.getItem('loginToken');
    if (token) {
      const res = await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/users/getUser`, {
        token
      })

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
  }

  render() {
    return (<Router >
      <Switch >
        <Route path="/" exact component={Index} />
        <Route path="/boards" exact component={Boards} />
        <Route path="/boards/lists" component={Lists} />
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
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(App);