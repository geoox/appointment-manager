import React from 'react';
import './App.css';
import LoginForm from './components/login-component'
import DoctorHome from './components/Doctor/home'
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { BrowserRouter, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      
      <Switch>
        <Route path='/login' component={LoginForm}></Route>
        <Route path='/doctor/home' component={DoctorHome}></Route>
        <Route path='/'><Redirect to='/login'></Redirect></Route>
      </Switch>
   </BrowserRouter>
  );
}

export default App;
