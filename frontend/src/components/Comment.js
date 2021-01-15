import React, { Component } from 'react'
import axios from 'axios';
import AuthHandler from './Auth';
import { Link } from 'react-router-dom';

export default class Comment extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          id: props.id,
          comments: props.comments,
          btnDisabled: true, 
          comment : ""
        };
    }

    static getDerivedStateFromProps(props, state){
        if (props.comments !== state.comments) {
            return {
              comments: props.comments,
            };
          }
      
          // Return null if the state hasn't changed
          return null;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })

        if (this.state.comment!=""){
            this.setState({ btnDisabled : false })
        } else {
            this.setState({ btnDisabled : true })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            post : this.state.id,
            comment : this.state.comment
        }

        axios({
            method: 'post', 
            url: 'http://127.0.0.1:8000/comments/new/',
            data: data,
            headers: {
              Authorization: `Bearer ${AuthHandler.getLoginToken()}`
            }
          })
            .then( res => {
                console.log(res)
                this.props.onSubmit()
            })
            .catch( err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                {   AuthHandler.isLoggedIn() ?
                    <div class="card my-4 shadow">
                        <h5 class="card-header">Leave a Comment:</h5>
                        <div class="card-body">
                            <form onSubmit={this.handleSubmit} className="mb-2">
                                <div class="form-group">
                                    <textarea 
                                        name="comment" 
                                        className="form-control" 
                                        rows="5" 
                                        placeholder="Add New Comment"
                                        value={this.state.comment}  
                                        onChange={this.handleChange}>
                                    </textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={this.state.btnDisabled}>Submit</button>
                            </form>
                        </div>
                    </div>
                    : 
                    <div class="p-3 mb-2 bg-danger text-white">
                        <p>You must be logged in to post a comment.</p>
                        <Link className="text-white" to="/signin/"><p>Login</p></Link>
                    </div>
                }       
                <hr className="postBorder"/>
                {this.state.comments.map((comment) => (
                    <div class="card mb-3 shadow">
                        <div class="card-body">
                            <h5 class="card-title">{comment.user}</h5>
                            <small class="text-muted">{comment.date_posted}</small>
                            <p class="card-text">{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
