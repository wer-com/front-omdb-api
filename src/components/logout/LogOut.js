import React, { Component } from 'react';
import './css/LogOut.css';

class LogOut extends Component {
    
    componentDidMount(){
        this.props.setToken(null);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default LogOut;