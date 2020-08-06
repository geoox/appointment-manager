import React,  { Component } from 'react';
import './login-component.scss';
import { Button, Form, Select, Header, Icon, Segment } from 'semantic-ui-react'
const Options = [
    { key: 'd', text: 'Doctor', value: 'doctor' },
    { key: 'p', text: 'Patient', value: 'patient' },
]

class LoginForm extends Component {

    user_role = '';

    navigate = function (user_role) {
        if (user_role == 'doctor') {
            this.props.history.push('/doctor/home');
        }
        else if (user_role == 'patient') {
            this.props.history.push('/patient/home')
        }

    }   
    render(){
        return(
          <Segment className="component-login">
                
             
                
              <Form>
              {/* <Image src={ myImage } size='small' /> */}
              <Header inverted basic vertical padded='very' size='big' as='h1' textAlign="center" color='#1f2d3a'>Welcome to X Clinic</Header>
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
              onChange={(e, { value }) => {this.user_role = value;}}
              />
                  

              <Button icon labelPosition='right' type="submit" onClick = {() => this.navigate(this.user_role)}>
              Log In
              <Icon name='right arrow' />
              </Button>
              <Button floated='right' className="register-btn" onClick = {() =>  this.props.history.push('/register') }>Register</Button>


  
              </Form>
          </Segment>
        )
    }
}
export default LoginForm;