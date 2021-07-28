import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  handleLogoutUser = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user, isAuthenticated } = this.props;
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link">{user.name} </a>
        </li>{" "}
        <li className="nav-item">
          <a className="nav-link">
            {" "}
            <img
              src={user.avatar}
              alt={user.name}
              style={{ height: "25px", marginRight: "5px" }}
              title="You must have a gravatar to display the image"
            ></img>{" "}
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            onClick={(e) => this.handleLogoutUser(e)}
            className="nav-link"
          >
            Log Out
          </a>
        </li>{" "}
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            iConnect
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    auth: { user, isAuthenticated },
  } = state;
  return {
    user,
    isAuthenticated,
  };
};
export default connect(mapStateToProps, { logoutUser })(Navbar);
