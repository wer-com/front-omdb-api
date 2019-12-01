import React, { Component } from 'react';
import './css/Movies.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Movies extends Component {

    state = {
        movies:[],
        search: ''
    }

    
  setMovies = mov => {
    const {Search} = mov.data;
    this.setState({movies:Search});
  }

    getMovies = () => {
        const {token} = this.props;
        const {search} = this.props.location;
        const config = {headers: {
            'Authorization': 'Bearer ' + token
          }};
          console.log('getMovies() request');
          axios
            .get(`http://localhost:4000/movies${search}`, config)
            .then(res => {this.setMovies(res)})
            .catch(err=>{console.log(err.response)});
    }

    shouldRequest = async () => {
        const {search} = this.props.location;
        await this.getMovies();
        this.setState({search:search});
    }


    render() {
        const {search} = this.props.location;
        if(this.state.search !== search){
            this.shouldRequest();
        }
        const movies = this.state.movies? this.state.movies.map( ({Poster,Title,Type,Year,imdbID}) => [
            <Link className="link"  key={imdbID} to={`/movie/${imdbID}`}><div className="movie-container">
                <div>{imdbID}</div>
                <div>{Title}</div>
                <div>{Type}</div>
                <div>{Year}</div>
                <div><img className="poster" src={Poster} alt="poster"/></div>
            </div></Link>
        ]) : null ;
        return (
            <div className="movies">
                <div className="title-movie-container">
                    <div>imdbID</div>
                    <div>Title</div>
                    <div>Type</div>
                    <div>Year</div>
                    <div>Poster</div>
                </div>
                {movies}
            </div>
        );
    }
}

export default Movies;