import React, { Component } from 'react'
import Navbar from './Navbar';
import AuthHandler from './Auth';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
    state = { 
        profile : [],
        user : []
    } 
  
    componentDidMount() { 
        
        let id = AuthHandler.getUserID();

        let profile ; 
        let user;
  
        axios.get(`http://127.0.0.1:8000/profiles/${id}`) 
        .then(res => { 
            profile = res.data; 
            this.setState({ 
                profile : profile,
                user : profile.user
            }); 
        }) 
        .catch(err => {console.log(err)}) 
    } 

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="profile">
                        <div className="card shadow-lg border border-info">
                            <h1 className="text-center mt-4 border-bottom border-dark pb-2">Profile</h1>
                            <img src={this.state.profile.image} className="card-img-top" alt="..."/>
                            <div className="card-body border-top border-dark">
                                <h5 className="card-title">UserName : {this.state.user.username}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">First Name : {this.state.user.first_name}</li>
                                <li className="list-group-item">Last Name : {this.state.user.last_name}</li>
                                <li className="list-group-item">Email : {this.state.user.email}</li>
                            </ul>
                        </div>
                        <Link to="/profile/update/" class="btn btn-warning">Update</Link>
                    </div>
                </div>
            </div>
        )
    }
}
