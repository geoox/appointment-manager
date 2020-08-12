import React, { Component } from 'react';
import './Clinics.scss';
import UserMenu from './UserMenu'
import { Image, Grid, Card, Header, Icon, Form, TextArea } from 'semantic-ui-react'
import _ from 'lodash';


class Clinics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {

        fetch('https://appointment-mng.herokuapp.com/clinics')
        .then(responses => responses.json().then(clinics => {
            console.log('responses', clinics)
            this.setState({
                data: clinics
            })
        }));

    }

    render() {
        return (<div>
                    <UserMenu ></UserMenu>
                    <Grid columns='three' divided className="clinics">
                        <Grid.Row>
                            {_.map(this.state.data, (clinic)=>
                            <Grid.Column>
                                <Card>
                                    <Image src='https://pngimage.net/wp-content/uploads/2018/06/hopital-png-5.png' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{clinic.name}</Card.Header>
                                        <Card.Meta>Clinic</Card.Meta>
                                        <Card.Description>
                                        Schedule: {clinic.schedule}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a target="_blank" href={"https://www.google.com/maps/place/"+clinic.location}>
                                            <Icon name='location arrow' />
                                            See on Google Maps
                                        </a>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            )}
                        </Grid.Row>
                    </Grid>
                    </div>
        )
    }
}



export default Clinics;