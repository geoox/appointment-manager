import React, { Component } from 'react';
import './AdminClinics.scss';
import AdminMenu from './AdminMenu'
import { Table, Grid, Card, Header, Icon } from 'semantic-ui-react'
import _ from 'lodash';


class AdminClinics extends Component {

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
            <Grid>
                <Grid.Row>
                    <AdminMenu></AdminMenu>
                    <div className="dashboard">

                        <Header as='h2'>
                            <Icon name='hospital outline' />
                            <Header.Content>
                                Clinics
                                <Header.Subheader>Manage all clinics</Header.Subheader>
                            </Header.Content>
                        </Header>


                        <Table sortable celled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell
                                        sorted={column === 'name' ? direction : null}
                                    >
                                        Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={column === 'location' ? direction : null}
                                    >
                                        Location
                                    </Table.HeaderCell>

                                    <Table.HeaderCell
                                        sorted={column === 'schedule' ? direction : null}
                                    >
                                        Schedule
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
                </Grid.Row>
            </Grid>
        )
    }
}

export default AdminClinics;