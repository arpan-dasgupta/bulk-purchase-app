import React, { Component } from "react";
import Cdashboard from "./cust-dashboard";
import Vdashboard from "./vend-dashboard";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }
  render() {
    if (localStorage.getItem("type") === "1")
      return (
        <div>
          {/* <Navbar></Navbar> */}
          Vendor
          <Vdashboard></Vdashboard>
        </div>
      );
    else
      return (
        <div>
          {/* <Navbar></Navbar> */}
          Customer
          <Cdashboard></Cdashboard>
        </div>
      );
  }
}
