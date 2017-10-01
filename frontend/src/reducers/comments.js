import {
  ADD_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  SAVE_COMMENT
} from '../actions/types.js'

import {randomString} from '../helpers';

export default function comments(state={},action) {
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