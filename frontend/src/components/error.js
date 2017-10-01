import React, { Component } from 'react';


class Error extends Component {
   
  render() {
    const {post} = this.props;
  	return(
  		<h2>Error 404: File not found.</h2>
    );
  }


}

export default Error