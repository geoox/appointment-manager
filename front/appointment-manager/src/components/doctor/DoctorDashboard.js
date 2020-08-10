import React, { Component } from 'react';
import './DoctorDashboard.scss';
import SideMenu from './SideMenu'
import { Button, Checkbox, Icon, Table, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash'

class DoctorAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data: null,
            direction: null,
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

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    render() {
        const { column, data, direction } = this.state

        return (
            <div className="dashboard">

                  <Header as='h2'>
                    <Icon name='calendar alternate outline' />
                    <Header.Content>
                    Appointments
                    <Header.Subheader>Manage your next appointments</Header.Subheader>
                    </Header.Content>
                </Header>


                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'date' ? direction : null}
                            >
                                Date and time
                </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'name' ? direction : null}
                            >
                                Name
                </Table.HeaderCell>

                            <Table.HeaderCell>
                                Approved
              </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ date, name, approved }) => (
                            <Table.Row key={approved}>
                                <Table.Cell>{date}</Table.Cell>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{approved}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}


class DoctorProfile extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <SideMenu></SideMenu>
                    <DoctorAppointments></DoctorAppointments>
                </Grid.Row>
            </Grid>
        )
    }
}



export default DoctorProfile;