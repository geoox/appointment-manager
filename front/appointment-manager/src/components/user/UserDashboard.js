import React, { Component } from 'react';
import './UserDashboard.scss';
import UserMenu from './UserMenu'
import { Button, Dropdown, Modal, Icon, Table, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getDay from "date-fns/getDay";



class UserAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data_future: null,
            data_past: null,
            direction: null,
            modal_open: false,
            doctors: ["dr1", "dr2"],
            startDate: new Date(),
            excludeTimes: [
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17)
              ]
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
                    data_future: responses[0],
                    data_past: responses[1]
                })
            });

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
    }

    handleCalendarChange = date => {
        this.setState({
          startDate: date
        });
      };

    render() {
        const calendarFilter = date => {
            const day = getDay(date);
            return date >= new Date() && day !== 0 && day!== 6;
        }
        const { column, data_future, data_past, direction } = this.state;
        const countryOptions = [
            { key: 'af', value: 'af', text: 'Afghanistan' },
            { key: 'ax', value: 'ax', text: 'Aland Islands' },
            { key: 'al', value: 'al', text: 'Albania' },
            { key: 'dz', value: 'dz', text: 'Algeria' },
            { key: 'as', value: 'as', text: 'American Samoa' },
            { key: 'ad', value: 'ad', text: 'Andorra' },
            { key: 'ao', value: 'ao', text: 'Angola' },
            { key: 'ai', value: 'ai', text: 'Anguilla' },
            { key: 'ag', value: 'ag', text: 'Antigua' },
            { key: 'ar', value: 'ar', text: 'Argentina' },
            { key: 'am', value: 'am', text: 'Armenia' },
            { key: 'aw', value: 'aw', text: 'Aruba' },
            { key: 'au', value: 'au', text: 'Australia' },
            { key: 'at', value: 'at', text: 'Austria' },
            { key: 'az', value: 'az', text: 'Azerbaijan' },
            { key: 'bs', value: 'bs', text: 'Bahamas' },
            { key: 'bh', value: 'bh', text: 'Bahrain' },
            { key: 'bd', value: 'bd', text: 'Bangladesh' },
            { key: 'bb', value: 'bb', text: 'Barbados' },
            { key: 'by', value: 'by', text: 'Belarus' },
            { key: 'be', value: 'be', text: 'Belgium' },
            { key: 'bz', value: 'bz', text: 'Belize' },
            { key: 'bj', value: 'bj', text: 'Benin' },
          ]
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
                            Doctor:
                            <Dropdown
                                placeholder='Select Doctor'
                                fluid
                                search
                                labeled
                                selection
                                options={countryOptions}
                            />
                            <br/>
                            Date:
                            <br/>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleCalendarChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                filterDate={calendarFilter}
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
                                Doctor name
                </Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data_future, ({ date, name, approved }) => (
                            <Table.Row key={approved}>
                                <Table.Cell>{date}</Table.Cell>
                                <Table.Cell>{name}</Table.Cell>
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
                                Doctor name
                </Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data_past, ({ date, name, approved }) => (
                            <Table.Row key={approved}>
                                <Table.Cell>{date}</Table.Cell>
                                <Table.Cell>{name}</Table.Cell>
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