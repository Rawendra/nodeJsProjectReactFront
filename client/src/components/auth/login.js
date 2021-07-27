import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.prventDefault();
    console.log("data to be submitted", this.state);
  };
  render() {
    const { email, password } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div style={{ textAlign: "center" }}>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, errors } = state;
  return {
    auth,
    errors,
  };
};
export default connect(mapStateToProps, { loginUser })(Login);
