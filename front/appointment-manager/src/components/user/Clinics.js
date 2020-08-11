import React, { Component } from 'react';
import './Clinics.scss';
import UserMenu from './UserMenu'
import { Image, Grid, Card, Header, Icon, Form, TextArea } from 'semantic-ui-react'
import _ from 'lodash';


class Clinics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinics: [
                {
                    name: "Coltescu",
                    location: "45.790789, 24.158143",
                    schedule: "09:00 - 18:00"
                },
                {
                    name: "Vitan",
                    location: "45.790789, 24.158143",
                    schedule: "10:00 - 18:30"
                },
                {
                    name: "Titan",
                    location: "45.790789, 24.158143",
                    schedule: "09:00 - 16:30"
                }
            ]
        }
    }

    componentDidMount() {

        Promise.all([
            fetch('https://quiz-app-api-georgedobrin.c9users.io/api/users/1').then(res => res.json()),
            fetch('https://quiz-app-api-georgedobrin.c9users.io/api/finished_tests').then(res => res.json())
        ])
            .then(responses => {
                console.log('responses', responses)
                this.setState({
                    data: responses
                })
            });

    }

    render() {
        return (<div>
                    <UserMenu></UserMenu>
                    <Grid columns='three' divided className="clinics">
                        <Grid.Row>
                            {_.map(this.state.clinics, (clinic)=>
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