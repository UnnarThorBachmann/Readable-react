import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter,Link,Redirect} from 'react-router-dom'
import {votePost,deletePost,createComment} from '../actions'; 
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import Comment from './comment.js';
import {timeComparator} from '../helpers';

class PostDetailed extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      deleted: false,
      author: '',
      body: '',
      category: 'react'
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);

    this.voteUp= this.voteUp.bind(this);
    this.voteDown= this.voteDown.bind(this);
    this.delete = this.delete.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    const {dispatch,post} = this.props;
    dispatch(createComment({
      author: this.state.author,
      body: this.state.body,
      category: this.state.category,
      parentId: post.id
    }))
    this.setState({
      deleted: false,
      title: '',
      author: '',
      body: '',
      category: 'react'
    });
  }

  handleChangeTitle(event) {
    event.preventDefault();
    this.setState({title: event.target.value})
  }
  handleChangeAuthor(event) {
    event.preventDefault();
    this.setState({author: event.target.value})
  }
  handleChangeBody(event) {
    event.preventDefault();
    this.setState({body: event.target.value})
  }
  handleChangeCategory(event) {
    event.preventDefault();
    this.setState({category: event.target.value})

  }

  voteUp () {
    const {dispatch,post} = this.props;
    dispatch(votePost(post.id,1));
  }

  voteDown() {
    const {dispatch,post} = this.props;
    dispatch(votePost(post.id,-1));
  }
  
  delete() {
    const {dispatch,post} = this.props;
    dispatch(deletePost(post.id));
    this.setState({deleted: true})
  }
  
  
  render() {
    let {post,comments,categories} = this.props;
    if (this.state.deleted) {
      return (<Redirect to=""/>)
    }
    comments[Symbol.iterator] = function*() {
      for (let key in this) {
              yield this[key] 
      }
    }
    let comments_array = []
    for (const comment of comments)
      if (comment.parentId === post.id)
          comments_array.push(comment);

    comments = comments_array;
  	return(
      !post.deleted && (
      <div className="mainDetailPost">
        
    	 <h2>{post.title} <sub className="subscript">by {post.author}</sub></h2>
       <p>{post.body}</p>
       <div className="bottomButtons">
          <span> Votes: {post.voteScore}</span>
          <button className="iconLink" onClick={this.voteUp}><FaArrowUp/></button>
          <button className="iconLink" onClick={this.voteDown}><FaArrowDown/></button>
          <Link to={"/edit/" + `${post.id}`} className="iconLink">EDIT</Link>
          <button className="iconLink" onClick={this.delete}>DELETE</button>
       </div>
       <h4>Comments</h4>
       {
        comments.map((comment)=> <Comment key={comment.id} comment={comment}/>).sort(timeComparator)
       }
            <form onSubmit={this.handleSubmit}>
        <h4>Add a comment</h4>
        <h5>
         Author
        </h5>
        <textarea cols="70" value={this.state.author}  onChange={this.handleChangeAuthor}></textarea>
        
        <h5>
          Body
        </h5>
          <textarea cols="70" rows="5" value={this.state.body}  onChange={this.handleChangeBody}></textarea>
        <div className="bottomButtons">
        <input className="iconLink" type="submit" value="Create a comment" />
        
        </div>
      </form>

      </div>)
    );
  }


}
const mapStateToProps = (state)=> ({
    comments: (state.comments.comments) ?state.comments.comments:{},
    categories: (state.categories.categories)?state.categories.categories.map((category)=> category.name).filter((category)=> category !== 'all'):[]

});
export default withRouter(connect(mapStateToProps)(PostDetailed));