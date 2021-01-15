import React, { Component } from 'react'
import Navbar from './Navbar';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthHandler from './Auth'

export default class Login extends Component { 

    state = {
        username:'',
        password:'',
        btnDisabled: true, 
        submited: AuthHandler.isLoggedIn()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });

        if (this.state.username!="" && this.state.password!=""){
            this.setState({ btnDisabled : false })
        } else {
            this.setState({ btnDisabled : true })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: this.state.username, 
            password: this.state.password,
        }

        axios.post('http://127.0.0.1:8000/login/',data)
            .then( res => {
                // console.log(res)
                if (res.status === 200){
                    localStorage.setItem("token", res.data.access)
                    localStorage.setItem("refresh", res.data.refresh)
                    this.setState({submited:AuthHandler.isLoggedIn()})
                }
            })
            .catch( err => {
                console.log(err)
            })
    }

    render() {
        if(this.state.submited){
            return <Redirect to="/"/>
        }
        return (
            <div>
                <Navbar/>

                <div className="container">
                    <div className="login shadow-lg">
                        <form className="pr-5 pl-5" onSubmit={this.handleSubmit}>
                            <h1 className="text-center pb-5 pt-2">Login</h1>
                            <div className="form-group pb-1">
                                <input 
                                    name="username"
                                    type="text" 
                                    className="form-control rounded-pill" 
                                    placeholder="Username" 
                                    value={this.state.username} 
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group pb-1">
                                <input 
                                    name="password"
                                    type="password" 
                                    className="form-control rounded-pill" 
                                    placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
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
                        <Link to="/signup"><p className="pt-3 text-center">Create An Account</p></Link>
                    </div>
                </div>
            </div>
        )
    }
}
