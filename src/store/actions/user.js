import { SET_USERNAME } from '../../constants/ActionType';

const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    username
  };
};

export { setUsername };