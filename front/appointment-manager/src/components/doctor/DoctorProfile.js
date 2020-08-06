import React, { Component } from 'react';
import './DoctorProfile.scss';
import SideMenu from './SideMenu'
import { Image, Grid, Table } from 'semantic-ui-react'


class DoctorProfile extends Component{
    render(){
        return(
            <Grid>
                <Grid.Row>
                    <SideMenu></SideMenu>
                </Grid.Row>
            </Grid>
        )
    }
}



export default DoctorProfile;