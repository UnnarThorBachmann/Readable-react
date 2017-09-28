import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter,Link,Redirect} from 'react-router-dom'
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.comment.author,
      body: props.comment.body,

    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
  }

  
  handleSubmit(event) {
    event.preventDefault();
    const {comment} = this.props;
    const {author, body} = this.state;
    this.props.save(comment, author,body);
  }

  handleChangeBody(event) {
    event.preventDefault();
    this.setState({body: event.target.value})
  }

  handleChangeAuthor(event) {
    event.preventDefault();
    this.setState({author: event.target.value})
  }
  
  
  render() {
    const {comment} = this.props;

  	return(
  
      <div>
        <form onSubmit={this.handleSubmit}>
        <h3>
         Author
        </h3>
        <textarea cols="50" value={this.state.author}  onChange={this.handleChangeAuthor}></textarea>
        <h3>
          Body
        </h3>
          <textarea cols="50" rows="5" value={this.state.body}  onChange={this.handleChangeBody}></textarea>
        <div className="bottomButtons">
        <input className="iconLink" type="submit" value="Save" />
        
        </div>
      </form>
      </div>
    );
  }


}

export default withRouter(connect()(CommentForm));