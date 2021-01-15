import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthHandler from './Auth';
export default class DeletePost extends Component {

    state ={
        submited : false
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'delete', 
            url: `http://127.0.0.1:8000/post/${this.props.id}/delete/`,
            headers: {
              Authorization: `Bearer ${AuthHandler.getLoginToken()}`
            }
          })
            .then( res => {
                console.log(res)
                this.setState({
                    submited: true
                })
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
                <button type="button" class="btn btn-danger ml-3 mb-3" data-toggle="modal" data-target="#staticBackdrop">
                Delete
                </button>

                <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Delete Post</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Do you really want ot delete post?
                    </div>
                    <div class="modal-footer">
                        <form onSubmit={this.handleSubmit}>
                            <button type="submit" class="btn btn-danger mr-1">Delete</button>
                            <Link to={`/post/${this.props.id}/`} className="btn btn-secondary" data-dismiss="modal">Cancel</Link>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
