import React, { Component } from 'react';
import './css/SignUp.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class SignUp extends Component {
    state={
        email:'',
        name:'',
        password:''
    }
    inputHandler = e => {
        const {name,value} = e.target;
        this.setState({[name]:value});
    }
    submitHandler = e => {
        e.preventDefault();
        const {email,name,password} = this.state;
        const user = {email,name,password};
        axios
            .post('http://localhost:4000/auth/signup',user)
            .then(res => {this.props.history.push('/login')})
            .catch(err=>{console.log(err.response)});
    }
    render() {
        return (
        <div className="signup">
            <div>
                <h3>Account Details</h3>
                <hr/>
                <div className="form-container">
                    <form className="signup-form" noValidate autoComplete="off" onSubmit={this.submitHandler}>
                        <div className="signup-input-div"><TextField id="outlined-basic" name="email" value={this.state.email} label="email" variant="outlined" className="signup-input" onChange={this.inputHandler}/></div>
                        <div className="signup-input-div"><TextField id="outlined-basic" type="password" name="password" label="password" variant="outlined" className="signup-input" onChange={this.inputHandler} /></div>
                        <div className="signup-input-div"><TextField id="outlined-basic" name="name" label="name" variant="outlined" className="signup-input" onChange={this.inputHandler}/></div>
                        <div className="signup-button-div">
                            <Button type="submit" variant="contained" size="large" color="primary" className="signup-button">
                                SUBMIT
                            </Button>
                        </div>
                </form>
                </div>
            </div>
        </div>
        );
    }
}

export default SignUp;