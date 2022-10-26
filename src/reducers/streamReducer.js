import _ from 'lodash';
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
      case FETCH_STREAM: //we get an action fetch type stream we are going to take our state object
      return {...state, [action.payload.id]: action.payload }; //we get all the properties inside and add them to a new object and we add dinamicaly a new key valueper on the fly, it has a key of the streams id and a value of the actual stream 
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
