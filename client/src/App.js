import "./App.css";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";

//check for toekn
if (localStorage.getItem("jwtToken")) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded });
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
          <Route exact path="/" component={Landing} />

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
