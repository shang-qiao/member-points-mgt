import { SET_USERNAME } from '../../constants/ActionType';

const reducer = (state = { username: '' }, action) => {
  switch(action.type) {
    case SET_USERNAME: 
      return {
        username: action.username
      };
    default:
      return state;
  }
};

export default reducer;