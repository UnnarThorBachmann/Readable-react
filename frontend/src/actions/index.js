export const CREATE_POST = 'CREATE_POST';
export const SAVE_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE';
export const VOTE_POST = 'VOTE_POST';
export const SET_POSTS = 'SET_POSTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const CHANGE_SORT = 'CHANGE_SORT';

export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const SAVE_COMMENT = 'SAVE_COMMENT';

export const EMPTY_FALSE = 'EMPTY_FALSE';



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