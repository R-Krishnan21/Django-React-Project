import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SignUp extends Component {
    state = {
        username:'',
        password:'',
        email:'',
        first_name:'',
        last_name:'',
        btnDisabled: true,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });

        if (this.state.username!="" && this.state.password!="" && 
            this.state.email!="" && this.state.first_name!="" && 
            this.state.last_name!=""){
            this.setState({ btnDisabled : false })
        } else {
            this.setState({ btnDisabled : true })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: this.state.username, 
            email: this.state.email, 
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name
        }

        axios.post('http://127.0.0.1:8000/register/', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <Navbar/>

                <div className="container">
                    <div className="signup shadow-lg">
                        <form className="pr-5 pl-5" onSubmit={this.handleSubmit}>

                            <h1 className="text-center pb-5 pt-5">Create Account</h1>

                            <div className="form-group pb-1">
                                <input 
                                    name="username"
                                    type="text" 
                                    className="form-control rounded-pill" 
                                    placeholder="Username" 
                                    value={this.state.username} 
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group pb-1">
                                <input 
                                    name="first_name"
                                    type="text" 
                                    className="form-control rounded-pill" 
                                    placeholder="First Name" 
                                    value={this.state.first_name} 
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group pb-1">
                                <input 
                                    name="last_name"
                                    type="text" 
                                    className="form-control rounded-pill" 
                                    placeholder="Last Name" 
                                    value={this.state.last_name} 
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group pb-1">
                                <input 
                                    name="email"
                                    type="email" 
                                    className="form-control rounded-pill" 
                                    id="Email1" 
                                    aria-describedby="emailHelp"
                                    placeholder="Email" 
                                    value={this.state.email} 
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div class="form-group pb-1">
                                <input
                                    name="password"  
                                    type="password" 
                                    className="form-control rounded-pill" 
                                    id="Password"
                                    placeholder="Password" 
                                    value={this.state.password} 
                                    onChange={this.handleChange}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block rounded-pill pr-5 pl-5"
                                disabled={this.state.btnDisabled} 
                                value="submit">
                                    Submit
                            </button>
                        </form>
                        <Link to="/signin"><p className="pt-3 text-center">Already Have An Account?</p></Link>
                    </div>
                </div>
            </div>
        )
    }
}
