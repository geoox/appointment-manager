import React, { Component } from 'react';
import './Clinics.scss';
import UserMenu from './UserMenu'
import { Image, Grid, Card, Header, Icon, Form, TextArea } from 'semantic-ui-react'


class Clinics extends Component {

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
                    <div className="clinics">
                        salut
                    </div>
                </Grid.Row>
            </Grid>
        )
    }
}



export default Clinics;