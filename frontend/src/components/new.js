import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {createPost} from '../actions'; 

import Change from '../components/change.js';


class New extends Component {
   
  render() {
    const {post} = this.props;
  	return(
      <Change post={post} change={createPost}></Change>
    );
  }


}

export default withRouter(connect()(New));