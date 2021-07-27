import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerNewUserUrl } from "../../urls/register";
import { baseUrl } from "../../urls/baseUrl";
import { validateRegistrationUser } from "../../utils/validation";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import {withRouter} from 'react-router-dom'
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("data to be submitted", this.state);
    console.log(baseUrl, registerNewUserUrl);
    const { name, email, password, password2 } = this.state;
    const obj = { name, email, password, password2 };
    const statusOfValidation = validateRegistrationUser(obj);
    // if (statusOfValidation.errors) {
    //   alert(statusOfValidation.errors);
    //   return;
    // }

    this.props.registerUser(obj, this.props.history);
  };
  render() {
    const { name, email, password, password2 } = this.state;
    const { onChange, onSubmit } = this;
    console.log(this.props.auth);

    return (
      <div style={{ textAlign: "center" }}>
        <h1 className="large text-primary">Sign Up </h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, errors } = state;
  return {
    auth: auth,
    errors: errors,
  };
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
