import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {changeSort} from '../actions'; 

class SortBy extends Component {
  constructor(props) {
    super(props);
    this.state = {sortby: 'time'}
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
  }
  
  handleChangeSortBy (e) {
    const {dispatch} = this.props;
    this.setState({sortby: e.target.value});
    dispatch(changeSort(e.target.value));
  }
  render() {
    const sortbys = ['time','comments', 'votes'];
  	return(
      <div>
      <span className="sortBy">Sort by</span>
      <select value={this.state.sortby} onChange={this.handleChangeSortBy}>
          {sortbys.map((sortby)=> <option key={sortby} value={`${sortby}`}>{sortby}</option>)}
        </select>
      </div>
    
    );
  }
}
function mapStateToProps(state) {
  return {sortby: state.sort}
}
export default withRouter(connect(mapStateToProps)(SortBy));