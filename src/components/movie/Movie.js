import React,{useState,useEffect} from 'react';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';

const Movie = props => {
    const [added,setAdded] = useState(false);
    const [movie,setMovie] = useState({});

  
    useEffect(()=>{
        const {pathname} = props.location;
        const id = pathname.split('/')[2];
        const {token} = props;
        const config = {headers: {
            'Authorization': 'Bearer ' + token
          }};
        if(id){
            axios
            .get(`http://localhost:4000/movies/${id}`, config)
            .then(res => {setMovie(res.data);})
            .catch(err=>{console.log(err.response)});
        }
        
    },[])

    const addMovie = () => {
        const {token} = props;
        const config = {headers: {
            'Authorization': 'Bearer ' + token
          }};
        if(!added){
            axios
                .post(`http://localhost:4000/user/movies`,movie,config)
                .then(res => {console.log(res); setAdded(true);})
                .catch(err=>{console.log(err.response)});}
                
        else{
            console.log('already added');
        }
    }

    const movieDisplay = movie?<div className="movie-movie-container">
        
    <div className="Poster"><img className="poster" src={movie.Poster} alt="poster"/></div>
    <div>
        <div className="Title">Title: {movie.Title}</div>
        <div className="Plot">Plot: {movie.Plot}</div>
        <div className="Type">Type: {movie.Type}</div>
        <div className="Year">Year: {movie.Year}</div>
        <div className="Awards">Awards: {movie.Awards}</div>
        <div className="BoxOffice">BoxOffice: {movie.BoxOffice}</div>
        <div className="Country">Country: {movie.Country}</div>
        <div className="Director">Director: {movie.Director}</div>
        <Fab onClick={addMovie} aria-label="like" className="like">
            <FavoriteIcon />
        </Fab>
    </div>
    <div className="Actors">Actors: {movie.Actors}</div>
</div>:null;
    return (
        <div>
            {movieDisplay}
        </div>
    )
}

export default Movie
