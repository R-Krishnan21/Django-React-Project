import React, { Component } from 'react';
import Navbar from './Navbar';
import Main from './Main';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Main/>
            </div>    
        )
    }
}
