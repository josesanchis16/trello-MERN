import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//Importacion de vistas
import Index from './Vistas/Index/Index';

//Importacion de estilos
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        {/* <Route path="*" component={} /> */}
      </Switch>
    </Router>
  );
}

export default App;
