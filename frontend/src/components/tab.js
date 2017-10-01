import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Tab extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    let {categories} = this.props;
    categories = categories ? categories: [];
  	return(
      <div className="tab">
        {categories.map((category)=> <div className="tabDiv" key={category.name}>
                                           <Link to={`/${category.path}`} className="button">{category.name}</Link></div>)
              }
      </div>
    
    );
  }
}

export default Tab