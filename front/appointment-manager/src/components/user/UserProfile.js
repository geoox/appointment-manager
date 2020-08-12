import React, { Component } from 'react';
import './UserProfile.scss';
import UserMenu from './UserMenu'
import { Image, Grid, Card, Header, Icon, Form, TextArea, Button } from 'semantic-ui-react'


class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: null,
                username: null,
                journal: ''
            },
        }
    }

    fetchPatient(){
        fetch('https://appointment-mng.herokuapp.com/patient/'+localStorage.getItem('user'))
        .then(userDetails => userDetails.json().then(details=>{
            console.log(details);
            this.setState({
                data: details[0]
            });
        }))
    }

    componentDidMount() {

        this.fetchPatient();

    }

    onJournalChanged = (e) => {
        this.setState({
            data:{
                journal: e.target.value,
                name: this.state.data.name,
                username: this.state.data.username
            }
        })
    }

    onUpdateJournalClick = () => {

        const obj = {
            journal: this.state.data.journal
        }

        fetch('https://appointment-mng.herokuapp.com/patient/update/'+localStorage.getItem('user'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.fetchPatient();
            })
            .catch((error) => {
                console.error('Error:', error);
        });
    }

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <UserMenu></UserMenu>
                    <div className="profile">
                        <Header as='h2'>
                            <Icon name='address book outline' />
                            <Header.Content>
                                Profile
                        <Header.Subheader>Check your profile details</Header.Subheader>
                            </Header.Content>
                        </Header>

                        <Card>
                            <Image src='https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{this.state.data.name}</Card.Header>
                                <Card.Description>
                                    Patient
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    {this.state.data.username}
                                </a>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header className="card-header-journal">Medical Journal</Card.Header>
                                <Form>
                                    <TextArea placeholder="Patient's journal" value={this.state.data.journal} rows={5} onChange={this.onJournalChanged}/>
                                </Form>
                            </Card.Content>
                            <Button secondary onClick={this.onUpdateJournalClick}>Update Journal</Button>
                        </Card>

                    </div>
                </Grid.Row>
            </Grid>
        )
    }
}



export default UserProfile;