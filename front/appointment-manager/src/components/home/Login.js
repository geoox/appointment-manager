import React, { Component } from 'react';
import './Login.scss';
import { Button, Form, Select, Image, Icon } from 'semantic-ui-react'


const Options = [
    { key: 'd', text: 'Doctor', value: 'doctor' },
    { key: 'p', text: 'Patient', value: 'patient' },
]

class LoginForm extends Component {

    role = '';

    navigate = function (role) {
        if (role == 'doctor') {
            this.props.history.push('/doctor/profile');
        }
        else if (role == 'patient') {
            this.props.history.push('/patient/profile');
        }
    }

    render() {
        return (
            <div className="component-login">
                <Form>
                    <Form.Field>
                        <label className='labelRed'>Username</label>
                        <input placeholder='Username' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type='password' />
                    </Form.Field>
                    <Form.Field
                        control={Select}
                        options={Options}
                        label='Role'
                        placeholder='Role'
                        onChange={(e, { value }) => { this.role = value; }}
                    />


                    <Button icon labelPosition='right' type="submit" onClick={() => this.navigate(this.role)}>
                        Log In
                        <Icon name='right arrow' />
                    </Button>
                    <Button floated='right' className="register-btn" onClick={() => this.props.history.push('/register')}>Register</Button>

                </Form>
            </div>
        )
    }
}

export default LoginForm;