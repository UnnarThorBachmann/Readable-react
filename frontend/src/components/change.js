import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter,Link,Redirect} from 'react-router-dom'
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';


class Change extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.post.title,
      author: props.post.author,
      body: props.post.body,
      category: props.post.category,
      saved: '',

    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);

  }

  
  handleSubmit(event) {
    event.preventDefault();
    const {dispatch,post} = this.props;
    dispatch(this.props.change({
      ...post,
      title: this.state.title,
      author: this.state.author,
      body: this.state.body,
      category: this.state.category,
    }))
    this.setState({saved: 'Post was saved!'});
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

  
  render() {
    const {post,categories} = this.props;

    if (this.state.saved === 'Post was saved!') {
      return <Redirect to=""/>;
    }
  	return(
  
      <div className="mainDetailPost">
        <form onSubmit={this.handleSubmit}>
        <h3>
         Title <sub className="alert">{this.state.saved}</sub>
        </h3>
        <textarea cols="100" value={this.state.title}  onChange={this.handleChangeTitle}></textarea>
        <h3>
         Author
        </h3>
        <textarea cols="100" value={this.state.author}  onChange={this.handleChangeAuthor}></textarea>
        <h3>
         Category
        </h3>
        <select value={this.state.category} onChange={this.handleChangeCategory}>
          {categories.map((category)=> <option key={category} value={`${category}`}>{category}</option>)}
          
        </select>
        <h3>
          Body
        </h3>
          <textarea cols="100" rows="5" value={this.state.body}  onChange={this.handleChangeBody}></textarea>
        <div className="bottomButtons">
        <input className="iconLink" type="submit" value="Save" />
        
        </div>
      </form>
      </div>
    );
  }


}
const mapStateToProps = (state)=> ({
    categories: (state.categories.categories)?state.categories.categories.map((category)=> category.name).filter((category)=> category !== 'all'):[]
  
});
export default withRouter(connect(mapStateToProps)(Change));