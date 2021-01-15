import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    state = { 
        posts : [], 
        categories : [],
    } 
  
    componentDidMount() { 
  
        axios.all([
            axios.get('http://127.0.0.1:8000/post/'),
            axios.get('http://127.0.0.1:8000/category/')
        ])
            .then(axios.spread((post,category) => {
                post = post.data,
                category = category.data
                this.setState({ 
                    posts : post,
                    categories : category
                });
            }))
            .catch(err=>{console.log(err)})
    }
    render() {
        return( 
            <div> 
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-8">
                            {this.state.posts.map((post) =>  (
                                <div className="card shadow-lg mb-4" key={post.id}>
                                        {/* const name = ((post || {}).author || {}).username; */}

                                        { (post.image != "") ?
                                            <span>
                                                <img src={post.image} className="card-img-top"/>
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
                                    <span className="border border-info">
                                        <div className="card-body">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.content}</p>
                                            <Link className="btn btn-primary" to={`/post/${post.id}`}>Read More &rarr;</Link>
                                        </div>
                                        <div class="card-footer text-muted">
                                            Posted on {post.date_posted} by 
                                            <Link to={`/user/${((post || {}).author || {}).username}`}>{((post || {}).author || {}).username}</Link>
                                        </div>
                                    </span>
                                </div>
                            ))} 
                        </div>
                         <div className="col-md-4">
                            {/* Categories Widget  */}
                            <div className="card my-4">
                                <h5 className="card-header">Categories</h5>
                                <div className="card-body">
                                    <ul className="list-unstyled mb-0">
                                        {this.state.categories.map((category) =>  (
                                            <li>
                                                {/* <a href="/category/:str/">{category.category}</a> */}
                                                <Link to={`/category/${category.category}/`}>{category.category}</Link>
                                            </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Side Widget  */}
                            <div className="card my-4">
                                <h5 className="card-header">Side Widget</h5>
                                <div className="card-body">
                                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div> 
        ); 
    } 
}
