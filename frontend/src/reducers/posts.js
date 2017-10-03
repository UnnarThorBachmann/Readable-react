import {
  CREATE_POST,
  SAVE_POST,
  DELETE_POST,
  SET_POSTS,
  VOTE_POST
} from '../actions/types.js'
import {randomString,deletePostOnServer,PostOnServer,SaveOnServer} from '../helpers';

export default function posts(state={},action) {
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
        //PostOnServer(action.post)
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
        //SaveOnServer(action.post);
  	  	return {
          ...state,
          posts: {
            ...state.posts,
            [action.post.id]: action.post
          }
        }
      case DELETE_POST:
        deletePostOnServer(action.id);
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