import { combineReducers } from 'redux';
import posts from './posts.js';
import comments from './comments.js';
import categories from './categories.js';
import empty from './empty.js';
import sorts from './sorts.js';



export default combineReducers({
  empty,
  categories,
  posts,
  sorts,
  comments
});