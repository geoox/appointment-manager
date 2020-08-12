import React, { Component } from 'react';
import './AdminAppointments.scss';
import AdminMenu from './AdminMenu'
import { Table, Grid, Card, Header, Icon } from 'semantic-ui-react'
import _ from 'lodash';
import moment from 'moment';


class AdminAppointments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data: null,
            direction: null,
        }
    }

    componentDidMount() {

        fetch('https://appointment-mng.herokuapp.com/appointments')
            .then(responses => responses.json().then(app => {
                console.log('responses', app)
                this.setState({
                    data: app
                })
            }));

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
            <Grid>
                <Grid.Row>
                    <AdminMenu></AdminMenu>
                    <div className="dashboard">

                        <Header as='h2'>
                            <Icon name='calendar alternate outline' />
                            <Header.Content>
                                Appointments
                                <Header.Subheader>Manage all appointments</Header.Subheader>
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
                                        sorted={column === 'patientname' ? direction : null}
                                    >
                                        Patient Username
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={column === 'doctorname' ? direction : null}
                                    >
                                        Doctor Username
                                    </Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {_.map(data, ({ date, patient_username, doctor_username }) => (
                                    <Table.Row key={date}>
                                        <Table.Cell>{moment(date).format('LLLL')}</Table.Cell>
                                        <Table.Cell>{patient_username}</Table.Cell>
                                        <Table.Cell>{doctor_username}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Grid.Row>
            </Grid>
        )
    }
}



export default AdminAppointments;