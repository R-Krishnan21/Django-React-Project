import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import AuthHandler from './Auth'
import { Redirect } from 'react-router-dom';

export default class NewPost extends Component {

    state = {
        title:'',
        content:'',
        image:null,
        url:'',
        category:'',
        btnDisabled: true, 
        categories: [],
        submited : false
    }

    componentDidMount() { 

        let categories;
  
        axios.get('http://127.0.0.1:8000/category/') 
        .then(res => { 
            categories = res.data; 
            this.setState({ 
                categories : categories,  
            }); 
        }) 
        .catch(err => {console.log(err)})
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });

        if (this.state.title!="" && this.state.content!="" && this.state.category!=""){
            this.setState({ btnDisabled : false })
        } else {
            this.setState({ btnDisabled : true })
        }
    }

    handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };

    handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);
        form_data.append('url', this.state.url);
        form_data.append('category', this.state.category);

        axios({
            method: 'post', 
            url: 'http://127.0.0.1:8000/post/new/',
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
            return <Redirect to="/"/>
        }
        return (
            <div>
                <Navbar/>

                <div className="container">
                    <div className="post shadow-lg">
                        <form className="pr-5 pl-5" onSubmit={this.handleSubmit}>

                            <h1 className="text-center pb-5 pt-5">New Post</h1>

                            <div className="form-group pb-1">
                                <input 
                                    name="title"
                                    type="text" 
                                    className="form-control rounded-pill" 
                                    placeholder="Title" 
                                    value={this.state.title} 
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group pb-1">
                                <input 
                                    name="content"
                                    type="text" 
                                    className="form-control rounded-pill" 
                                    placeholder="Content" 
                                    value={this.state.content} 
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div class="form-group pb-1">
                                <select 
                                    name="category"
                                    className="custom-select form-control rounded-pill" 
                                    value={this.state.category} 
                                    required
                                    onChange={this.handleChange}
                                >
                                    {/* <option value="" selected>Select Category</option> */}
                                    {this.state.categories.map((category) =>  (
                                        <option key={category.id} value={category.id}>{category.category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group pb-1">
                                <input 
                                    name="url"
                                    type="url" 
                                    className="form-control rounded-pill" 
                                    placeholder="url" 
                                    value={this.state.url} 
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group pb-1 custom-file mb-3">
                                <input 
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
