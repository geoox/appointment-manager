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
import AdminAppointments from '../admin/AdminAppointments';
import AdminAccounts from '../admin/AdminAccounts';
import AdminClinics from '../admin/AdminClinics';

function App() {
  var loggedIn = false;
  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/patient/dashboard" /> : <Redirect to="/login" />}
      </Route>
      <Route path='/login' component={LoginForm}></Route>
      <Route path='/register' component={RegisterForm}></Route>
      <Route exact path='/doctor/dashboard' component={DoctorDashboard}/>
      <Route exact path='/doctor/profile' component={DoctorProfile}/>
      <Route exact path='/patient/profile' component={UserProfile}/>
      <Route exact path='/patient/dashboard' component={UserDashboard}/>
      <Route exact path='/patient/clinics' component={Clinics}/>
      <Route exact path='/admin/appointments' component={AdminAppointments}/>
      <Route exact path='/admin/accounts' component={AdminAccounts}/>
      <Route exact path='/admin/clinics' component={AdminClinics}/>
    </Switch>
  );
}

export default App;
