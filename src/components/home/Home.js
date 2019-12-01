import React, { Component } from 'react';
import './css/Home.css';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    state = {
        value:''
    }
    submitHandler = e => {
        e.preventDefault();
        const {value} = this.state;
        if(value) this.props.history.push(`/movies?title=${value}`);
  
    }
    inputHandler = e =>{
        this.setState({value:e.target.value});
    }
    render() {
        return (
            <div className="search">
                <Paper component="form" onSubmit={this.submitHandler}>
                    <InputBase
                        onChange={this.inputHandler}
                        value={this.state.value}
                        className="search-input"
                        placeholder="Search Movies"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

          </div>
        );
    }
}

export default withRouter(Home);