import React, { Component } from 'react';
import AuthHandler from './Auth';
import axios from 'axios';

export default class Test extends Component {
    componentDidMount() {
        // AuthHandler.createAccessToken()
        AuthHandler.checkAccessTokenExpiry()
    }
    render() {
        return (
            <div>
                <h1>Test</h1>
            </div>
        )
    }
}
