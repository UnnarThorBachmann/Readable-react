import React, { Component } from 'react';


const CommentHeader = (props)=> (
	<div>
			<p>{props.body}</p>
			<div><sub className="subscript2">Author: {props.author}</sub></div>  		
   	</div>
	
	
)

export default CommentHeader