import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import FaExpand from 'react-icons/lib/fa/expand';
import {voteComment,deleteComment,saveComment} from '../actions'; 
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import CommentHeader from './commentHeader.js';
import CommentForm from './commentForm.js';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {editMode: false}

    this.voteUp= this.voteUp.bind(this);
    this.voteDown= this.voteDown.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);

  }
  voteUp () {
  	const {dispatch,comment} = this.props;

  	dispatch(voteComment(comment.id,1));
  }
  voteDown() {
  	const {dispatch,comment} = this.props;
  	dispatch(voteComment(comment.id,-1));
  }
  delete () {
    const {dispatch,comment} = this.props;
    dispatch(deleteComment(comment.id))
  }
  edit () {
    this.setState((state)=>({editMode: !state.editMode}));
  }
  save (comment,author,body) {
    const {dispatch} = this.props;
    this.setState({editMode: false});
    dispatch(saveComment({
      ...comment,
      author: author,
      body: body
    }));
  }
  render() {
    const {comment} = this.props;
    const isDead = comment.parentDeleted || comment.deleted 
  	return(
  		  
    	 <div className="postlist">
        
        {!this.state.editMode && (<CommentHeader body={comment.body} author={comment.author}/>)}
        {this.state.editMode && (<CommentForm comment={comment} save={this.save}/>)}

         <span> Votes: {comment.voteScore}</span>
    	   <button className="iconLink" onClick={this.voteUp}><FaArrowUp/></button>
  
          
        <button className="iconLink" onClick={this.voteDown}><FaArrowDown/></button>
    	   {!this.state.editMode && (<button className="iconLink" onClick={this.edit}>EDIT</button>)}
         {this.state.editMode && (<button className="iconLink" onClick={this.edit}>CANCEL</button>)}
         {/*this.state.editMode && (<button className="iconLink" onClick={this.save}>SAVE</button>)*/}
        <button className="iconLink" onClick={this.delete}>DELETE</button>
        </div>
        	 
    );
  }
}

export default withRouter(connect()(Comment));