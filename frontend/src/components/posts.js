import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Post from './post.js';
import {withRouter,Route} from 'react-router-dom'
import Button from './button.js';
import SortBy from './sortby.js';

class Posts extends Component {
  
  render() {
    const {posts,filter,header} = this.props;
    let filtered_posts;
    if (filter !== 'all')
    	filtered_posts = posts.filter((post)=> post.category === filter);
    else
    	filtered_posts = posts;
  	return(
  		
    	<div className="posts">
          
          <SortBy/>
      		{filtered_posts.map((post)=> <Post key={post.id} post={post}></Post>)}
          <Button/>
		  </div>
    
    );
  }
}

export default Posts;