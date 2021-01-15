import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
import AuthHandler from './Auth'
import { IoPersonCircleOutline } from "react-icons/bs";

export default class Navbar extends Component {
    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <NavLink className="navbar-brand" to="/">Blog</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="nav navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact activeClassName="active" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact to="/profile/">Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact to="/post/new/">New Post</NavLink>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdown">
                                    {(AuthHandler.isLoggedIn()) ?
                                        <NavLink className="dropdown-item" to="/logout/">Logout</NavLink>
                                        :
                                        <span>
                                            <NavLink className="dropdown-item" to="/signup/">Sign Up</NavLink>
                                            <NavLink className="dropdown-item" to="/signin/">Login</NavLink>
                                        </span>
                                    }
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
