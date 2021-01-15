import React, { Component } from 'react'
import Navbar from './Navbar';
import { Link, Redirect } from 'react-router-dom';
import AuthHandler from './Auth'

export default class logout extends Component {
    render() {
        AuthHandler.logoutUser();
        return (
            <div>
                <Redirect to="/signin"/>
            </div>
        )
    }
}
