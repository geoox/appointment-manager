import React, { Component } from 'react';
import './UserProfile.scss';
import UserMenu from './UserMenu'
import { Image, Grid, Card, Header, Icon, Form, TextArea, Button } from 'semantic-ui-react'


class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: 'andreipatient',
                name: 'Andrei The Patient',
                journal: 'Bones problems since childhood'
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
                            <Image src='https://lh3.googleusercontent.com/proxy/Fte11l82DF2fIYonx9HQLkRedx7TD_J7rmDp_MTnHF5F1arajJIlnxy7CNiTShafYu4KXiYKJ7tu0Qn0QermqmsISpyh7KpGIuJtS5SRcZ4RHAT1zj1Q2t1ChEP_gEo' wrapped ui={false} />
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
                                    <TextArea placeholder="Patient's journal" value={this.state.data.journal} rows={5}/>
                                </Form>
                            </Card.Content>
                            <Button secondary>Update Journal</Button>
                        </Card>

                    </div>
                </Grid.Row>
            </Grid>
        )
    }
}



export default UserProfile;