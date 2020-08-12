import React, { Component } from 'react';
import './UserDashboard.scss';
import UserMenu from './UserMenu'
import { Button, Dropdown, Modal, Icon, Table, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment'

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getDay from "date-fns/getDay";



class UserAppointments extends Component {
    constructor(props) {
        super(props);
        this.onSpecialtyChange = this.onSpecialtyChange.bind(this);
        this.onDoctorChange = this.onDoctorChange.bind(this);

        this.state = {
            column: null,
            data_future: null,
            data_past: null,
            direction: null,
            modal_open: false,
            doctors: [],
            specialties: [],
            startDate: null,
            excludeTimes: [
            ],
            specialty_choice: null,
            doctor_choice: null,
            doctor_appointments: []
        }
    }

    fetchAllAppointments(){
        Promise.all([
            fetch('https://appointment-mng.herokuapp.com/appointments/patient/'+localStorage.getItem('user')+"/future").then(res => res.json()),
            fetch('https://appointment-mng.herokuapp.com/appointments/patient/'+localStorage.getItem('user')+"/past").then(res => res.json()),
        ])
        .then(appointments => {
            this.setState({
                data_future: appointments[0],
                data_past: appointments[1]
            })
        })
    }

    componentDidMount() {

        this.fetchAllAppointments();

    }

    fetchSpecialties(){
        fetch('https://appointment-mng.herokuapp.com/specialties')
        .then(resp => resp.json()
        .then(specialties => {
            let specialtiesArr = [];
            _.forEach(specialties, specialty => {
                specialtiesArr.push({
                    key: specialty, value: specialty, text: specialty
                })
            })
            console.log('specialties', specialtiesArr);
            this.setState({
                specialties: specialtiesArr
            })
        }))
    }

    fetchDoctors(){
        fetch('https://appointment-mng.herokuapp.com/doctors/' + this.state.specialty_choice)
        .then(resp => resp.json()
        .then(doctors => {
            let doctorsArr = [];
            _.forEach(doctors, doctor => {
                doctorsArr.push({
                    key: doctor.username, value: doctor.username, text: doctor.name
                })
            })
            console.log('doctors', doctorsArr);
            this.setState({
                doctors: doctorsArr
            })
        }))
    }

    fetchDoctorAppointments(){
        fetch('https://appointment-mng.herokuapp.com/appointments/doctor/'+this.state.doctor_choice)
        .then(resp => resp.json())
        .then(appointments => {
            _.forEach(appointments, appointment => {
                // let excludeDatesArr = this.state.excludeTimes;
                // excludeDatesArr.push(Date.parse(appointment.date));
                // this.setState({
                //     excludeTimes: excludeDatesArr
                // })
                let drAppointments = this.state.doctor_appointments;
                drAppointments.push(appointment.date);

                this.setState({
                    doctor_appointments: drAppointments
                }, ()=> console.log('dates', this.state.doctor_appointments))
            })
        })
    }

    handleSort = clickedColumn => () => {
        const { column, data_future, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data_future, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data_future.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    openModal(){
        this.fetchSpecialties();
        this.setState({
            modal_open: true
        })
    }

    closeModal(){
        this.setState({
            modal_open: false
        })
    }

    onSpecialtyChange(e, data){
        console.log(data.value);
        this.setState({
            specialty_choice: data.value
        }, () => this.fetchDoctors());
    }

    onDoctorChange(e, data){
        console.log(data.value);
        this.setState({
            doctor_choice: data.value
        }, () => this.fetchDoctorAppointments());
    }

    handleCalendarChange = date => {
        this.setState({
            excludeTimes: []
        }, () => {

            this.state.doctor_appointments.map(doctor_date => {
                console.log('one date', doctor_date)
                if(moment(doctor_date).isSame(date, "day")){
                    let excludeArr = this.state.excludeTimes;
                    excludeArr.push(Date.parse(doctor_date));
                    this.setState({
                        excludeTimes: excludeArr
                    }, ()=>console.log('excluded times', this.state.excludeTimes))
                }
            })
    
            this.setState({
            startDate: date
            });

        })
    };


    saveModal(){
        let newAppointment = {
            patient_username: localStorage.getItem('user'),
            doctor_username: this.state.doctor_choice,
            date: this.state.startDate
        }
        fetch('https://appointment-mng.herokuapp.com/new_appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAppointment),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.fetchAllAppointments();
                this.setState({
                    modal_open: false
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({
                    modal_open: false
                })
        });
    }

    render() {

        const calendarFilter = date => {
            const day = getDay(date);
            return date >= new Date() && day !== 0 && day!== 6;
        }

        const { column, data_future, data_past, direction } = this.state;

        return (
            <div className="appointments">
                <Header as='h2'>
                    <Icon name='address book outline' />
                    <Header.Content>
                        Appointments
                        <Header.Subheader>Manage your appointments</Header.Subheader>
                    </Header.Content>
                </Header>

                <Modal
                    trigger={
                        <Button secondary icon labelPosition='right' onClick={()=>this.openModal()}>
                            Create an appointment
                            <Icon name='calendar plus outline' />
                        </Button>
                    }
                    open={this.state.modal_open}
                >
                    <Modal.Content image>
                        {/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped /> */}
                        <Modal.Description>
                            <Header>Create a new appointment</Header>
                            Specialty:
                            <Dropdown
                                placeholder='Select Specialty'
                                fluid
                                search
                                labeled
                                selection
                                options={this.state.specialties}
                                onChange={this.onSpecialtyChange}
                            />
                            Doctor:
                            <Dropdown
                                placeholder='Please Select Specialty First'
                                fluid
                                search
                                labeled
                                selection
                                options={this.state.doctors}
                                onChange={this.onDoctorChange}
                            />
                            <br/>
                            Date:
                            <br/>
                            <DatePicker
                                id="datepicker"
                                selected={this.state.startDate}
                                onChange={this.handleCalendarChange}
                                showTimeSelect
                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                maxTime = {setHours(setMinutes(new Date(), 0), 18)}
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                filterDate={calendarFilter}
                                disabled={this.state.doctor_choice===null}
                                placeholderText="Please select the doctor first"
                                excludeTimes={this.state.excludeTimes}
                                />
                        </Modal.Description>
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

                <Header as='h3' dividing>
                    Future Appointments
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
                                Doctor username
                </Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data_future, ({ date, doctor_username }) => (
                            <Table.Row key={date}>
                                <Table.Cell>{moment(date).format('LLLL')}</Table.Cell>
                                <Table.Cell>{doctor_username}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Header as='h3' dividing>
                    Past Appointments
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
                                Doctor username
                </Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data_past, ({ date, doctor_username }) => (
                            <Table.Row key={date}>
                                <Table.Cell>{moment(date).format('LLLL')}</Table.Cell>
                                <Table.Cell>{doctor_username}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}


class UserDashboard extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <UserMenu></UserMenu>
                    <UserAppointments></UserAppointments>
                </Grid.Row>
            </Grid>
        )
    }
}



export default UserDashboard;