//register user
import axios from "axios";
import { GET_ERRORS } from "./types";
import { registerNewUserUrl } from "../urls/register";

export const registerUser = (userData) => (dispatch) => {
  axios.post(`${registerNewUserUrl}`, userData).then((response) => {
    console.log(response);
  }).catch(err=>dispatch({type:GET_ERRORS}))
  return {
    type: GET_ERRORS,
    payload: userData,
  };
};
