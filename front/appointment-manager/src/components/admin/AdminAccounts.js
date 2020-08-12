import React, { Component } from 'react';
import './AdminAccounts.scss';
import AdminMenu from './AdminMenu'
import { Table, Grid, Button, Header, Icon } from 'semantic-ui-react'
import _ from 'lodash';


class AdminAccounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data: null,
            direction: null,
        }
    }

    componentDidMount() {

        fetch('https://appointment-mng.herokuapp.com/accounts')
            .then(responses => responses.json().then(accounts => {
                console.log('responses', accounts)
                this.setState({
                    data: accounts
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

    onRegisterClick(){
        console.log('register clicked');
        this.props.history.push('/register');
    }

    render() {
        const { column, data, direction } = this.state
        return (
            <Grid>
                <Grid.Row>
                    <AdminMenu></AdminMenu>
                    <div className="dashboard">

                        <Header as='h2'>
                            <Icon name='users' />
                            <Header.Content>
                                Accounts
                                <Header.Subheader>Manage all Accounts</Header.Subheader>
                            </Header.Content>
                        </Header>

                        <Button secondary onClick={()=>this.onRegisterClick()}>Register a new account</Button>
                        <Table sortable celled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell
                                        sorted={column === 'username' ? direction : null}
                                    >
                                        Username
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={column === 'name' ? direction : null}
                                    >
                                        Name
                                    </Table.HeaderCell>

                                    <Table.HeaderCell
                                        sorted={column === 'role' ? direction : null}
                                    >
                                        Role
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {_.map(data, ({ username, name, user_role }) => (
                                    <Table.Row key={username}>
                                        <Table.Cell>{username}</Table.Cell>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{user_role}</Table.Cell>
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

export default AdminAccounts;