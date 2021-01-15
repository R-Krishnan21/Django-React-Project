import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default class CategoryPost extends Component {
    state = { 
        posts : [], 
    } 
  
    componentDidMount() {
        let post ; 
  
        axios.get(`http://127.0.0.1:8000/post/?search=${this.props.match.params.str}`) 
        .then(res => { 
            post = res.data; 
            this.setState({ 
                posts : post,
            }); 
            // console.log(this.state.data)
        }) 
        .catch(err => {console.log(err)}) 
    } 

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container mt-4">
                    <h1>Post About {this.props.match.params.str}</h1>
                    <div className="row">
                        <div className="col-md-8">
                            {this.state.posts.map((post) =>  (
                                <div className="card shadow-sm mb-4" key={post.id}>
                                    <div className="card-body">
                                        <Link to={`/post/${post.id}`}><h5 className="card-title">{post.title}</h5></Link>
                                        {/* const name = ((post || {}).author || {}).username; */}
                                        
                                        <Link to={`/user/${((post || {}).author || {}).username}`}><p className="card-text">Post By : {((post || {}).author || {}).username}
                                        <small className="text-muted date">on : {post.date_posted}</small></p></Link>
                                        <hr className="postBorder"/>
                                        <p>{post.content}</p>
                                        <hr className="postBorder"/>
                                        { (post.image != "") ?
                                            <span>
                                                <img src={post.image} class="card-img-bottom" alt="..."/>
                                                <hr className="postBorder"/>
                                            </span>
                                            :null
                                        }
                                        {/* <!-- 16:9 aspect ratio --> */}
                                        { (post.url != "") ?
                                            <span>
                                                <div class="embed-responsive embed-responsive-21by9">
                                                    <iframe class="embed-responsive-item" src={post.url}></iframe>
                                                </div>
                                                <hr className="postBorder"/>
                                            </span>
                                            :null
                                        }
                                    </div>
                                </div>
                                )
                            )} 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
