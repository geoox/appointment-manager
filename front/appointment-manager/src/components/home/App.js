import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Switch, Route} from 'react-router-dom';
import LoginForm from './Login'
import RegisterForm from './Register';
import IndexDoctor from '../doctor/IndexDoctor';

function App() {
  return (
    <Switch>
      <Route path='/login' component={LoginForm}></Route>
      <Route path='/register' component={RegisterForm}></Route>
      <Route path='/doctor' component={IndexDoctor}></Route>
    </Switch>
  );
}

export default App;
