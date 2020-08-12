import React, { Component } from 'react';
import './Register.scss';
import { Button, Form, Select, Icon } from 'semantic-ui-react'


const RoleOptions = [
    { key: 'd', text: 'Doctor', value: 'doctor' },
    { key: 'p', text: 'Patient', value: 'patient' },
]


class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.onRegisterClick = this.onRegisterClick.bind(this);
      }

    role = '';

    onRegisterClick = () => {
        console.log('register clicked');
    }

    render() {
        return (
            <div className="component-login">
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type='password' />
                    </Form.Field>
                    <Form.Field
                        control={Select}
                        options={RoleOptions}
                        label='Role'
                        placeholder='Role'
                        onChange={(e, { value }) => { this.role = value; }}
                    />
                    <Form.Field>
                        <label>Specialty</label>
                        <input placeholder='Specialty' />
                    </Form.Field>

                    <Button icon labelPosition='right' type="submit" onClick={() => this.onRegisterClick}>
                        Register
                    <Icon name='right arrow' />
                    </Button>



                </Form>
            </div>
        )
    }
}

export default RegisterForm;