import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginForm from './Login'
import RegisterForm from './Register';
import DoctorProfile from '../doctor/DoctorProfile';
import DoctorDashboard from '../doctor/DoctorDashboard';
import UserProfile from '../user/UserProfile';
import UserDashboard from '../user/UserDashboard'
import Clinics from '../user/Clinics';

function App() {
  var loggedIn = true;
  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/patient/dashboard" /> : <LoginForm />}
      </Route>
      <Route path='/login' component={LoginForm}></Route>
      <Route path='/register' component={RegisterForm}></Route>
      <Route exact path='/doctor/dashboard' component={DoctorDashboard}/>
      <Route exact path='/doctor/profile' component={DoctorProfile}/>
      <Route exact path='/patient/profile' component={UserProfile}/>
      <Route exact path='/patient/dashboard' component={UserDashboard}/>
      <Route exact path='/patient/clinics' component={Clinics}/>
    </Switch>
  );
}

export default App;
