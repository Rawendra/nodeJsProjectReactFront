import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { registerNewUserUrl } from "../urls/register";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`${registerNewUserUrl}`, userData)
    .then((response) => {
      console.log(response);
      history.push("/login");
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login
//get user toeken

export const loginUser = (userData,history) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      //set Current User
      dispatch(setCurrentUser(decoded));
      history.push('/dashboard')
    })
    .catch((err) => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

//setting the logged in user

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  //set current user to an empty object
  dispatch(setCurrentUser({}));
};
