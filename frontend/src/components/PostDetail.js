import React, { Component } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import DeletePost from './DeletePost';
import Comment from './Comment';
import AuthHandler from './Auth';
import { Link } from 'react-router-dom';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            post : [],
            submit : false,
            update : false
        }
    }

    handleSubmit = () => {
        this.setState({
            submit : true
        })
    }

    fetchData = () => {
        let post ; 
  
        axios.get(`http://127.0.0.1:8000/post/${this.props.match.params.id}`) 
        .then(res => { 
            post = res.data; 
            this.setState({ 
                post : post,     
            }); 
        }) 
        .catch(err => {console.log(err)})
    }

  
    componentDidMount() { 
         this.fetchData()
    } 

    componentDidUpdate(){
        if(this.state.submit){
            this.fetchData()
        }
    }

    render() { 
        let comments;
        let deleteBtn;
        if(this.state.post != ""){
            comments = <Comment id={this.state.post.id} comments={this.state.post.comments} onSubmit={this.handleSubmit}/>
        } else{
            comments = null
        }
        if(AuthHandler.isOwner(((this.state.post || {}).author || {}).id)){
            deleteBtn = <DeletePost id={this.state.post.id}/>
        } else {
            deleteBtn = null
        }

        return( 
            <div> 
                <Navbar/>
                <div className="container mt-4 mb-4">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card shadow" key={this.state.post.id}>
                                <div className="card-body">
                                    <h1 className="mt-4">{this.state.post.title}
                                    <Link className="pl-5" to={`/category/${this.state.post.category}/`}><small>{this.state.post.category}</small></Link>
                                    </h1>
                                    <p className="lead">
                                        by
                                        <Link to={`/user/${((this.state.post || {}).author || {}).username}`}> {((this.state.post || {}).author || {}).username}</Link>
                                    </p>
                                    <hr className="postBorder"/>
                                    <p>Posted on {this.state.post.date_posted}</p>
                                    <hr className="postBorder"/>
                                    { (this.state.post.image != "") ?
                                        <span>
                                            <img src={this.state.post.image} className="card-img" alt="..."/>
                                            <hr className="postBorder"/>
                                        </span>
                                        :null
                                    }
                                    {/* <!-- 16:9 aspect ratio --> */}
                                    { (this.state.post.url != "") ?
                                        <span>
                                            <p><a href={this.state.post.url}>Link : {this.state.post.url}</a></p>
                                            <div className="embed-responsive embed-responsive-16by9">
                                                <iframe className="embed-responsive-item" src={this.state.post.url}></iframe>
                                            </div>
                                            <hr className="postBorder"/>
                                        </span>
                                        :null
                                    }
                                    <p>{this.state.post.content}</p>
                                </div>
                                {deleteBtn}
                            </div>
                            <br/>
                            {comments}
                        </div>
                    </div>
                </div>
            </div> 
        )
    } 
}

