import React, { Component } from 'react';
import './AdminClinics.scss';
import AdminMenu from './AdminMenu'
import { Modal, Table, Grid, Button, Header, Icon, Form } from 'semantic-ui-react'
import _ from 'lodash';


class AdminClinics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data: null,
            direction: null,
            modal_open: false,
            location: null,
            name: null,
            schedule: null
        }
    }

    fetchClinics(){
        fetch('https://appointment-mng.herokuapp.com/clinics')
        .then(responses => responses.json().then(clinics => {
            console.log('responses', clinics)
            this.setState({
                data: clinics
            })
        }));
    }

    componentDidMount() {
        this.fetchClinics();
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

    openModal(){
        this.setState({
            modal_open: true
        })
    }

    closeModal(){
        this.setState({
            modal_open: false
        })
    }

    saveModal(){
        console.log("saved clicked");
        this.setState({
            modal_open: false
        })

        const newClinic = {
            location: this.state.location,
            schedule: this.state.schedule,
            name: this.state.name
        }

        fetch('https://appointment-mng.herokuapp.com/clinics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClinic),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.fetchClinics();
            })
            .catch((error) => {
                console.error('Error:', error);
        });

    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
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


                        <Modal
                            
                            
                            open={this.state.modal_open}
                            trigger={<Button secondary onClick={()=>this.openModal()}>Register a new clinic</Button>}
                            >
                                <Header icon>
                                    <Icon name='hospital' />
                                    Register a new clinic
                                </Header>
                                <Modal.Content>
                                    <Form>
                                        <Form.Field>
                                            <label className='labelRed'>Clinic name</label>
                                            <input placeholder='Name' onKeyUp={this.handleChange} id="name"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Location coordinates</label>
                                            <input placeholder='Coordinates' onKeyUp={this.handleChange} id="location"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Schedule</label>
                                            <input placeholder='Schedule' onKeyUp={this.handleChange} id="schedule"/>
                                        </Form.Field>
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='black' onClick={() => this.closeModal()}>
                                        Cancel
                                    </Button>
                                    <Button
                                        content="Save"
                                        labelPosition='right'
                                        icon='checkmark'
                                        onClick={() => this.saveModal()}
                                        positive
                                    />
                                </Modal.Actions>
                            </Modal>

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
                                {_.map(data, ({ name, location, schedule }) => (
                                    <Table.Row key={name}>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{location}</Table.Cell>
                                        <Table.Cell>{schedule}</Table.Cell>
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