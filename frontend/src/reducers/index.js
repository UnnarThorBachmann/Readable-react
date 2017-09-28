import { combineReducers } from 'redux';

import {
  CREATE_POST,
  SAVE_POST,
  DELETE_POST,
  SET_POSTS,
  VOTE_POST,
  ADD_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  SAVE_COMMENT,
  SET_CATEGORIES,
  CHANGE_SORT,
  EMPTY_FALSE
} from '../actions'

import randomString from '../helpers';

function empty(state = {empty: true}, action) {
  switch(action.type) {
      case EMPTY_FALSE:
        return {
            ...state,
          empty: false
      }
      default:
        return state;
  }
}
function categories(state = {},action) {
  
  switch(action.type) {
      case SET_CATEGORIES:

        return {
            ...state,
            categories: action.categories
      }
      default:
        return state;
  }
}
function sorts(state = {sort: 'time'},action) {
  switch(action.type) {
      case CHANGE_SORT:
        return {
            ...state,
          sort: action.sort
        }

      default:
        return state;
  }
}

function comments(state={},action) {
  switch(action.type) {
      case ADD_COMMENT:
        return {
            ...state,
          comments: {
            ...state.comments,
            [action.comment.id]: action.comment
          }
        }
      case VOTE_COMMENT:
        return {
            ...state,
          comments: {
            ...state.comments,
            [action.id]: {
              ...state.comments[action.id],
              voteScore: state.comments[action.id].voteScore + action.value
            }
          }
        }
      case DELETE_COMMENT:
        return {
          ...state,
          comments: {
            ...state.comments,
            [action.id]: {
              ...state.comments[action.id],
              deleted: true
            }
          }
        }
      case CREATE_COMMENT:
        let id = randomString();
        while (state.comments.hasOwnProperty(id))
          id = randomString();
        return {
          ...state,
          comments: {
              ...state.comments,
              [id]: {
                id: id,
                parentId: action.comment.parentId,
                timestamp: Date.now(),
                title: action.comment.title,
                body: action.comment.body,
                author: action.comment.author,
                voteScore: 0,
                deleted: false,
                parentDeleted: false
              }
            }
        }
      case SAVE_COMMENT:
        
        return {
          ...state,
          comments: {
            ...state.comments,
            [action.id]: {
              ...state.comments[action.id],
              body: action.body,
              author: action.author
            }
          }
          
        }
      default:
        return state;
  }
}


function posts(state={},action) {
	switch(action.type) {
      case SET_POSTS:
        return {
            ...state,
          posts: action.posts
        }
      case VOTE_POST:
        return {
          ...state,
          posts: {
            ...state.posts,
            [action.id]: {
              ...state.posts[action.id],
              voteScore: state.posts[action.id].voteScore + action.value
            }
          }
        }
      case CREATE_POST:
        let id = randomString();
        while (state.posts.hasOwnProperty(id))
          id = randomString();
		    const ret = {
        	...state,
            posts: {
              ...state.posts,
            	[id]: {

                id: id,
                timestamp: Date.now(),
                title: action.post.title,
                body: action.post.body,
                author: action.post.author,
                category: action.post.category,
                voteScore: 0,
                deleted: false
              }
            }
        }
      	return  ret;
      case SAVE_POST:
  	  	return {
          ...state,
          posts: {
            ...state.posts,
            [action.post.id]: action.post
          }
        }
      case DELETE_POST:
      	return {
          ...state,
          posts: {
            ...state.posts,
            [action.id]: {
              ...state.posts[action.id],
              deleted: true
            }
          }
        }
        
	  default:
  	  	return state;
	}
}

export default combineReducers({
  empty,
  categories,
  posts,
  sorts,
  comments
});