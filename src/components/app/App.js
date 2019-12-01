import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './css/App.css';
import Movies from '../movies/Movies';
import Movie from '../movie/Movie';
import SignUp from '../signup/SignUp';
import LogIn from '../login/LogIn';
import LogOut from '../logout/LogOut';
import Account from '../account/Account';
import Home from '../home/Home';

class App extends React.Component {
  state={
    token:null
  }

  setToken = jwt_token => {
    this.setState({token:jwt_token});
  }

 
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <nav className="navigation">
            <div className="logo">
                OMDB API
            </div>
            <div>
              <Home token={this.state.token} />
            </div>
            <div className="links">
              <ul>
                <Link to="/account"><li>Account</li></Link>
                {!this.state.token?<Link to="/signup"><li>SignUp</li></Link>:null}
                {!this.state.token?<Link to="/login"><li>LogIn</li></Link>:<Link to="/logout"><li>LogOut</li></Link>}
              </ul>
            </div>
          </nav>
        </div>
        <Route exact path="/account" render={props => (<Account {...props} token={this.state.token}/>)} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" render={props => (<LogIn {...props}  setToken={this.setToken}/>)} />
        <Route path="/logout" render={props => (<LogOut {...props} setToken={this.setToken}/>)} />
        <Route path="/movies" render={props => (<Movies {...props}  token={this.state.token}/>)} />
        <Route path="/movie" render={props => (<Movie {...props} token={this.state.token}/>)} />
      </BrowserRouter>
    );
  }
}

export default App;
