import React, { Component } from 'react';
import './home.scss';
import { Button, Form, Select, Image, Menu, Grid, Segment } from 'semantic-ui-react'
import MenuHeader from '../menu'


class DoctorHome extends Component {

    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {
        const { activeItem } = this.state

        return (
            <div name='home-component'>
            <Menu inverted fluid>
                <Menu.Item header>Home</Menu.Item>
                <Menu.Item
                    name='Your appointments'
                    active={activeItem === 'appointments'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='jobs'
                    active={activeItem === 'jobs'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='locations'
                    active={activeItem === 'locations'}
                    onClick={this.handleItemClick}
                />
            </Menu>
            <Grid as='grid1' divided='vertically'>
                <Grid.Row columns={10}>
                    <Grid.Column>
                        Lorem ipsum
                    </Grid.Column>
                    <Grid.Column>
                        Lorem ipsum
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        )

    }
}
export default DoctorHome;