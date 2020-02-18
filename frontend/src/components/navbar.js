import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export class NavbarItem extends Component {
  render() {
    return (
      <li className="navbar-item">
        <Link to={this.props.link} className="nav-link">
          {this.props.name}
        </Link>
      </li>
    );
  }
}

export default class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Bulk Purchase App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Users
                </Link>
              </li>
              <NavbarItem link="/" name="Users"></NavbarItem>
              <NavbarItem link="/register" name="Register"></NavbarItem>
              <NavbarItem link="/login" name="Login"></NavbarItem>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
