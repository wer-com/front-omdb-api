import React, { Component } from 'react';
import './css/Account.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class Account extends Component {
    state = {
        movies:[]
    }

    setMovies = mov => {
        this.setState({movies:mov});
      }

      componentDidMount = () => {
        const {token} = this.props;
        const config = {headers: {
            'Authorization': 'Bearer ' + token
          }};
          console.log('getUserMovies() request');
          axios
            .get(`http://localhost:4000/user/movies`, config)
            .then(res => {this.setMovies(res.data.movies)})
            .catch(err=>{console.log(err.response)});
    }

    deleteMovies = id => {
        const {token} = this.props;
        const config = {headers: {
            'Authorization': 'Bearer ' + token
          }};
        axios
            .delete(`http://localhost:4000/user/movies/${id}`, config)
            .then(res => {this.setState({movies: this.state.movies.filter( movie => movie._id !== id)})})
            .catch(err=>{console.log(err.response)});
    }
    

    render() {
        const movies = this.state.movies? this.state.movies.map( ({_id,Poster,Title,Type,Year,imdbID}) => [
            <div className="account-container" key={imdbID}>
                <Link className="link-account"   to={`/movie/${imdbID}`}>
                    <div>{imdbID}</div>
                    <div>{Title}</div>
                    <div>{Year}</div>
                    <div><img className="poster" src={Poster} alt="poster"/></div>
                </Link>
                <div onClick={()=>{this.deleteMovies(_id)}}>
                    <IconButton aria-label="delete">
                    <DeleteIcon fontSize="large" />
                    </IconButton></div>
                </div>
        ]) : null ;
        return (
            <div className="account">
                <h1> Favourite Movies </h1>
                <div className="movies">
                <div className="title-movie-container">
                    <div>imdbID</div>
                    <div>Title</div>
                    <div>Year</div>
                    <div>Poster</div>
                    <div>Delete</div>
                </div>
                {movies}
            </div>
            </div>
        );
    }
}

export default Account;