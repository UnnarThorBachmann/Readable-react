
import React, { Component } from 'react';
import {Link} from 'react-router-dom';



const Button = (props) => (
  		<div className="bottomButtons">
  			<div className="newButton">
      			<Link to="/new" className="button">New Post</Link>
      		</div>
      	</div>
    );

export default Button

