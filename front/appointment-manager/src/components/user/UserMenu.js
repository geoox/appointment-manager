import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './UserMenu.scss'
import { NavLink } from 'react-router-dom';

class UserMenu extends Component {
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
                        <Menu.Header>General</Menu.Header>

                        <Menu.Menu>
                            <Menu.Item
                                name='Dashboard'
                                active={activeItem === 'dashboard'}
                                onClick={this.handleItemClick}
                                as={NavLink} exact to="/patient/dashboard"
                            />
                        </Menu.Menu>

                        <Menu.Menu>
                            <Menu.Item
                                name='My Profile'
                                active={activeItem === 'myprofile'}
                                onClick={this.handleItemClick}
                                as={NavLink} exact to="/patient/profile"
                            />
                        </Menu.Menu>

                        <Menu.Menu>
                            <Menu.Item
                                name='Clinics'
                                active={activeItem === 'clinics'}
                                onClick={this.handleItemClick}
                                as={NavLink} exact to="/patient/clinics"
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

export default UserMenu;