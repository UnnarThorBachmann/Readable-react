import {CHANGE_SORT} from '../actions/types.js'

import randomString from '../helpers';

export default function sorts(state = {sort: 'time'},action) {
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