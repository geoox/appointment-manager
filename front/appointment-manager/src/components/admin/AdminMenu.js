import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './AdminMenu.scss'
import { NavLink } from 'react-router-dom';

class AdminMenu extends Component {
    handleItemClick = name => this.setState({ activeItem: name })
    logOut = () => {
        console.log('log out!');
    }

    render() {
        const { activeItem } = this.state || {}

        return (
            <div className="menu-navbar">
                <Menu vertical>
                    <Menu.Item>
                        <Menu.Header>Management</Menu.Header>

                        <Menu.Menu>
                            <Menu.Item
                                name='Appointments'
                                active={activeItem === 'appointments'}
                                onClick={this.handleItemClick}
                                as={NavLink} exact to="/admin/appointments"
                            />
                        </Menu.Menu>

                        <Menu.Menu>
                            <Menu.Item
                                name='Accounts'
                                active={activeItem === 'accounts'}
                                onClick={this.handleItemClick}
                                as={NavLink} exact to="/admin/accounts"
                            />
                        </Menu.Menu>

                        <Menu.Menu>
                            <Menu.Item
                                name='Clinics'
                                active={activeItem === 'clinics'}
                                onClick={this.handleItemClick}
                                as={NavLink} exact to="/admin/clinics"
                            />
                        </Menu.Menu>
                    </Menu.Item>



                    <Menu.Item>
                        <Menu.Header>Account</Menu.Header>
                        <Menu.Menu>
                            <Menu.Item
                                name='Log Out'
                                onClick={this.logOut}
                            />
                        </Menu.Menu>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default AdminMenu;