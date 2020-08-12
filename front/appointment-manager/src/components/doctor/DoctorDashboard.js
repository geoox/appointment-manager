import React, { Component } from 'react';
import './DoctorDashboard.scss';
import SideMenu from './SideMenu'
import { Modal, Button, Icon, Table, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash';
import moment from 'moment';

class DoctorAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data: null,
            direction: null,
            loggedUser: localStorage.getItem('user'),
            modal_open: false,
            userDetails: {
                name:'',
                username:'',
                journal:'',
                history:''
            }
        }
    }

    componentDidMount() {

        fetch('https://appointment-mng.herokuapp.com/appointments/doctor/'+this.state.loggedUser)
            .then(response => response.json().then(appointments => {
                console.log('appointments', appointments)
                this.setState({
                    data: appointments
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

    openModal(user){
        this.setState({
            modal_open: true
        })

        console.log('user', user);
        fetch('https://appointment-mng.herokuapp.com/patient/'+user)
        .then(userDetails => userDetails.json().then(details=>{
            console.log(details);
            this.setState({
                userDetails: details[0]
            });
        }))
    }

    closeModal(){
        this.setState({
            modal_open: false
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
                    <Header.Subheader>Check your next appointments</Header.Subheader>
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
                                sorted={column === 'patient_username' ? direction : null}
                            >
                                Username
                            </Table.HeaderCell>


                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ date, patient_username }) => (
                            
                            <Modal
                            open={this.state.modal_open}
                            trigger={
                                <Table.Row onClick={()=>this.openModal(patient_username)} key={patient_username}>
                                    <Table.Cell>{moment(date).format('LLLL')}</Table.Cell>
                                    <Table.Cell>{patient_username}</Table.Cell>
                                </Table.Row>
                            }
                          >
                              <Modal.Header>
                                  <p>User Details</p>
                              </Modal.Header>
                              <Modal.Content>
                                  <p>Name: {this.state.userDetails.name}</p>
                                  <p>Username: {this.state.userDetails.username}</p>
                                  <p>Journal: {this.state.userDetails.journal}</p>
                                  {/* <p>Consultation history: {this.state.userDetails.history}</p> */}
                              </Modal.Content>

                              <Modal.Actions>
                                <Button color='black' onClick={() => {this.closeModal()}}>
                                    Close
                                </Button>
                            </Modal.Actions>

                          </Modal>
                            
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