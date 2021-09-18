import React, { Component } from "react";

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <a>LOGIN</a>
        <hr/>
        <a>SIGN UP</a>
        <hr/>
        <div>DashBoard</div>
      </>
    );
  }
}

export default DashBoard;
