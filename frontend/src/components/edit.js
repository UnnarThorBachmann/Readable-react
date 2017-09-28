import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {savePost} from '../actions'; 

import Change from '../components/change.js';


class Edit extends Component {
   
  render() {
    const {post} = this.props;
  	return(
      <Change post={post} change={savePost}></Change>
    );
  }


}

export default withRouter(connect()(Edit));