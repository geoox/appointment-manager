import React, { Component } from 'react';
import './DoctorProfile.scss';
import SideMenu from './SideMenu'
import { Image, Grid, Card, Header, Icon } from 'semantic-ui-react'


class DoctorProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: 'andreidoctor',
                name: 'Andrei The Doctor',
                specialty: 'Bones'
            },
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
        return (
            <Grid>
                <Grid.Row>
                    <SideMenu></SideMenu>
                    <div className="profile">
                        <Header as='h2'>
                            <Icon name='address book outline' />
                            <Header.Content>
                                Profile
                        <Header.Subheader>Check your profile details</Header.Subheader>
                            </Header.Content>
                        </Header>

                        <Card>
                            <Image src='https://www.lumos.edu/wp-content/uploads/2017/07/doctor-1.png' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{this.state.data.name}</Card.Header>
                                <Card.Description>
                                    Doctor
                                    <br/>
                                    Specialty: {this.state.data.specialty}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    {this.state.data.username}
                                </a>
                            </Card.Content>
                        </Card>
                    </div>
                </Grid.Row>
            </Grid>
        )
    }
}



export default DoctorProfile;