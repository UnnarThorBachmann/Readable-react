import {EMPTY_FALSE} from '../actions/types.js'

import randomString from '../helpers';

export default function empty(state = {empty: true}, action) {
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