import axios from "axios";
const setAuthToken = (token) => {
  if (token) {
    //jwt token on teh common headers
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //remove the previous token
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
