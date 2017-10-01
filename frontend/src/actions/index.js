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
} from './types.js'

export function emptyFalse() {
  return {
      type: EMPTY_FALSE,
        empty: false
    }
}

export function changeSort(sort) {
  return {
      type: CHANGE_SORT,
        sort: sort
    }
}

export function setPosts(posts) {

	return {
    	type: SET_POSTS,
      	posts: {...posts}
    }
}

export function setCategories(categories) {
	return {
    	type: SET_CATEGORIES,
      	categories: categories
    }
}

export function createPost(post) {
	return {
    	type: CREATE_POST,
      	post: post
    }
}

export function savePost(post) {
	return {
    	type: SAVE_POST,
      	post: post
    }
}

export function deletePost(id) {
	return {
    	type: DELETE_POST,
      	id
    }
}

export function votePost(id,value) {
  return {
      type: VOTE_POST,
        id: id,
        value: value
    }
}

export function addComment(comment) {
  return {
      type: ADD_COMMENT,
        comment: comment
    }
}


export function createComment(comment) {
	return {
    	type: CREATE_COMMENT,
      	comment: comment
    }
}

export function saveComment(comment) {
	return {
    	type: SAVE_COMMENT,
      	...comment
    }
}

export function deleteComment(id) {
	return {
    	type: DELETE_COMMENT,
      	id
    }
}
export function voteComment(id,value) {
	return {
    	type: VOTE_COMMENT,
      	id: id,
        value: value
    }
}