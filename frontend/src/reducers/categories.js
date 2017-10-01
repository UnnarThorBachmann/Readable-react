import {
  SET_CATEGORIES,
  CHANGE_SORT,
  EMPTY_FALSE
} from '../actions/types.js'

import randomString from '../helpers';

export default function categories(state = {},action) {
  
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