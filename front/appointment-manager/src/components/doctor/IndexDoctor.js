import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DoctorProfile from './DoctorProfile';



class IndexDoctor extends Component{
    render() {
        return(
        <div>
            <Switch>
                <Route exact path='/doctor/profile' component={DoctorProfile}/>
            </Switch>
        </div>
        );
    }
}

export default IndexDoctor;