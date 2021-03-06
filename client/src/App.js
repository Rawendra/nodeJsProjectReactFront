import "./App.css";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      {" "}
      <div className="App">
        <Navbar />          
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact  path="/" component={Landing} />
   
        <Footer />
      </div>
    </Router>
  );
}

export default App;
