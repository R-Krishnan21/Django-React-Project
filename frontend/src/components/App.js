import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HomePage from './HomePage';
import UserPost from './UserPost';
import Profile from './Profile';
import ProfileUpdate from './ProfileUpdate';
import Login from './Login';
import Logout from './Logout';
import SignUp from './SignUp';
import PostDetail from './PostDetail';
import NewPost from './NewPost';
import DeletePost from './DeletePost';
import CategoryPost from './CategoryPost';
import { PrivateRoute } from './PrivateRoute';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
import AuthHandler from './Auth';

class App extends Component {

    componentDidMount() {
        // AuthHandler.createAccessToken()
        AuthHandler.checkAccessTokenExpiry()
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/logout/" component={Logout}/>
                            <Route exact path="/signup/" component={SignUp}/>
                            <Route exact path="/signin/" component={Login}/>
                            <PrivateRoute exact path="/delete_post/" component={DeletePost}/>
                            <PrivateRoute exact path="/profile/" component={Profile}/>
                            <PrivateRoute exact path="/profile/update/" component={ProfileUpdate}/>
                            <PrivateRoute exact path="/post/new/" component={NewPost}/>
                            <Route exact path="/user/:author/" component={UserPost}/>
                            <Route exact path="/post/:id/" component={PostDetail}/>
                            <Route exact path="/category/:str/" component={CategoryPost}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));