import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default class UserPost extends Component {
    state = { 
        posts : [], 
    } 
  
    componentDidMount() { 
        let post ; 
  
        axios.get(`http://127.0.0.1:8000/user/${this.props.match.params.author}`) 
        .then(res => { 
            post = res.data; 
            this.setState({ 
                posts : post     
            }); 
        }) 
        .catch(err => {console.log(err)}) 
    } 
    render() { 
        return( 
            <div> 
                <Navbar/>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>Posts By {this.props.match.params.author}</h1>
                                {this.state.posts.map((post) =>  (
                                <span>
                                    <div class="card shadow-sm mb-4" key={post.id}>
                                        <div class="card-body">
                                            <Link to={`/post/${post.id}`}><h5 class="card-title">{post.title}</h5></Link>
                                            <p class="card-text">Post By : {((post || {}).author || {}).username} 
                                            <small class="text-muted date">on : {post.date_posted}</small></p>
                                            <hr className="postBorder"/>
                                            { (post.image != "") ?
                                                <span>
                                                    <img src={post.image} class="card-img-bottom" alt="..."/>
                                                    <hr className="postBorder"/>
                                                </span>
                                                :null
                                            }
                                            { (post.url != "") ?
                                                <span>
                                                    <p><a href={post.url}>Link : {post.url}</a></p>
                                                    <div class="embed-responsive embed-responsive-16by9">
                                                        <iframe class="embed-responsive-item" src={post.url}></iframe>
                                                    </div>
                                                    <hr className="postBorder"/>
                                                </span>
                                                :null
                                            }
                                        </div>
                                    </div>
                                </span>
                                )
                            )} 
                        </div>
                    </div>
                </div>
            </div> 
        ); 
    }
}
