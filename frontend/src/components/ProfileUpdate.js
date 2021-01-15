import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import AuthHandler from './Auth'
import { Redirect } from 'react-router-dom';

export default class ProfileUpdate extends Component {
    state = {
        image:null,
        submited : false
    }
    
    handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();

        let id = AuthHandler.getUserID();

        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);

        axios({
            method: 'put', 
            url: `http://127.0.0.1:8000/profiles/${id}/update/`,
            data: form_data,
            headers: {
                'content-type': 'multipart/form-data',
              Authorization: `Bearer ${AuthHandler.getLoginToken()}`
            }
          })
            .then( res => {
                // console.log(res)
                this.setState({
                    submited:true
                })   
            })
            .catch( err => {
                console.log(err)
            })
    }
    render() {
        if(this.state.submited){
            return <Redirect to={`/profile/`}/>
        }
        return (
            <div>
                <Navbar/>

                <div className="container">
                    <div className="post shadow-lg">
                        <form className="pr-5 pl-5" onSubmit={this.handleSubmit}>
                            <h1 className="text-center pb-5 pt-5">New Post</h1>

                            <div className="form-group pb-1 custom-file mb-3">
                                <input 
                                    required
                                    id="customFile" 
                                    name="image" 
                                    type="file" 
                                    accept="image/*"
                                    className="custom-file-input form-control"  
                                    onChange={this.handleImageChange}/>
                                <label class="custom-file-label" for="customFile">
                                    {(this.state.image != null) ? 
                                    <span>{this.state.image.name}</span>
                                    : "Choose Field"
                                }
                                </label>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block rounded-pill pr-5 pl-5 mt-2"
                                disabled={this.state.btnDisabled} 
                                value="submit">
                                    Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
