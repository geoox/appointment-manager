import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './AdminMenu.scss'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router'

class AdminMenu extends Component {

    constructor(props){
        super(props);
    }
    
    handleItemClick = name => this.setState({ activeItem: name })
    logOut = () => {
        localStorage.clear();
        this.props.history.push('/login');
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

export default withRouter(AdminMenu);