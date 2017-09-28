import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import FaExpand from 'react-icons/lib/fa/expand';
import {votePost} from '../actions'; 
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';


class Post extends Component {
  constructor(props) {
    super(props);
    this.voteUp= this.voteUp.bind(this);
    this.voteDown= this.voteDown.bind(this);

  }
  voteUp () {
  	const {dispatch,post} = this.props;

  	dispatch(votePost(post.id,1));
  }
  voteDown() {
  	const {dispatch,post} = this.props;
  	dispatch(votePost(post.id,-1));
  }
  
  render() {
    let {post,comments} = this.props;
    
    comments[Symbol.iterator] = function*() {
      for (let key in this) {
              yield this[key] 
      }
    }
    let comments_array = [];
    for (const comment of comments)
      if (!comment.deleted && comment.parentId === post.id)
          comments_array.push(comment);

    comments = comments_array;
    
  	return(
  		 !post.deleted &&
    	 <div className="postlist">
    	 {post.title} <sub className="subscript2">by {post.author}</sub>
    	 <span>Comments: {comments.length}, </span>
    	 <span> Votes: {post.voteScore}</span>
    	 <button className="iconLink" onClick={this.voteUp}><FaArrowUp/></button>
         <button className="iconLink" onClick={this.voteDown}><FaArrowDown/></button>
    	 <Link to={`${post.category}/${post.id}`}><FaExpand className="iconLink"/></Link>



    	 </div>

    );
  }
}
const mapStateToProps = (state)=> ({
    comments: (state.comments.comments) ?state.comments.comments:{}

});
export default withRouter(connect(mapStateToProps)(Post));