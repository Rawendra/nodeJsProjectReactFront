import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../utils/isEmpty";
const initialState = {
  isAuthenticated: false,
  user: {},
};
export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return { ...state, user: payload, isAuthenticated: !isEmpty(payload) };

    default:
      return state;
  }
}
