import React, { Component } from 'react';
import './Register.scss';
import { Button, Form, Select, Icon, Message } from 'semantic-ui-react'


const RoleOptions = [
    { key: 'd', text: 'Doctor', value: 'doctor' },
    { key: 'p', text: 'Patient', value: 'patient' },
]


class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.state = {
            user_role: '',
            showMessage: false
        }
      }


    onRegisterClick = () => {
        console.log('register clicked', this.state);
        let postObj = this.state;
        if(this.state.user_role === 'patient'){
            postObj['journal']= '';
        }
        fetch('https://appointment-mng.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postObj),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({
                    showMessage: true
                })
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
        return (
            <div className="component-login">
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' id="name" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username' id="username" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' id="password" type='password' onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field
                        control={Select}
                        options={RoleOptions}
                        label='Role'
                        placeholder='Role'
                        onChange={(e, { value }) => { 
                            this.setState({
                                user_role: value
                            })
                         }}
                    />
                    <Form.Field disabled={this.state.user_role !== 'doctor'}>
                        <label>Specialty</label>
                        <input placeholder='Specialty' id="specialty" onChange={this.handleChange}/>
                    </Form.Field>

                    <Button icon labelPosition='right' type="submit" onClick={this.onRegisterClick}>
                        Register
                    <Icon name='right arrow' />
                    </Button>



                </Form>
                {this.state.showMessage ?
                                <Message
                                id="success-message"
                                success
                                header='Your user registration was successful'
                                content='The user may now log-in with the username and password you have chosen'
                            /> : <div></div> }

            </div>
        )
    }
}

export default RegisterForm;