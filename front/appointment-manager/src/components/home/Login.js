import React, { Component } from 'react';
import './Login.scss';
import { Button, Form, Select, Icon, Header } from 'semantic-ui-react'


const Options = [
    { key: 'doctor', text: 'Doctor', value: 'doctor' },
    { key: 'patient', text: 'Patient', value: 'patient' },
    { key: 'admin', text: 'Admin', value: 'admin' },
]

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.state={
            username:'',
            password:''
        }
    }

    role = '';

    onLoginClick(){
        const credentials = {
            username: this.state.username,
            password: this.state.password
        }
        fetch('https://appointment-mng.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                localStorage.setItem('user', this.state.username);
                localStorage.setItem('token', data.token);
                if(data.role === 'admin'){
                    this.props.history.push('/admin/appointments');
                }else if(data.role === 'doctor'){
                    this.props.history.push('/doctor/dashboard');
                }else{
                    this.props.history.push('/patient/dashboard');
                }
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
                  <Header as='h2' icon textAlign='center' id="header-main">
                    <Icon name='hospital symbol' />
                    Hospital management
                    <Header.Subheader>
                    Login using your personal credentials
                    </Header.Subheader>
                </Header>
                <Form>
                    <Form.Field>
                        <label className='labelRed'>Username</label>
                        <input placeholder='Username' id="username" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' id="password" onChange={this.handleChange} type='password' />
                    </Form.Field>
                    {/* <Form.Field
                        control={Select}
                        options={Options}
                        label='Role'
                        placeholder='Role'
                        id="role"
                        onChange={(e, { value }) => { this.role = value; }}
                    /> */}


                    <Button icon labelPosition='right' type="submit" onClick={this.onLoginClick}>
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