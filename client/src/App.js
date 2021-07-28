import "./App.css";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import DashBoard from "./components/DashBoard";
import Login from "./components/auth/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { logoutUser, setCurrentUser } from "./actions/authActions";

//check for token
if (localStorage.getItem("jwtToken")) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  //store.dispatch({ type: SET_CURRENT_USER, payload: decoded });
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;;
  console.log(currentTime,decoded.exp < currentTime)

  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());
  //   window.location.href='/login'
  // }else{
  //   window.location.href='/dashboard'
  // }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        {" "}
        <div className="App">
          <Navbar />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/" component={Landing} />

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
