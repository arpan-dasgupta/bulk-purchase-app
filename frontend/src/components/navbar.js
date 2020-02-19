import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export class NavbarItem extends Component {
  render() {
    return (
      <li className="navbar-item">
        <a href={this.props.link} className="nav-link">
          {this.props.name}
        </a>
      </li>
    );
  }
}

export default class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a href="/login" className="navbar-brand">
            Bulk Purchase App
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {/* <li className="navbar-item">
                <Link to="/" className="nav-link">
                Users
                </Link>
              </li> */}
              {/* <NavbarItem link="/" name="Users"></NavbarItem> */}
              <NavbarItem link="/register" name="Register"></NavbarItem>
              <NavbarItem link="/login" name="Login"></NavbarItem>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export class VendorNavbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a href="/dashboard" className="navbar-brand">
            Bulk Purchase App
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {/* <NavbarItem link="/" name="Users"></NavbarItem> */}
              <NavbarItem link="/login" name="Login"></NavbarItem>
              <NavbarItem link="/register" name="Register"></NavbarItem>
              <NavbarItem link="/addproduct" name="Add Product"></NavbarItem>
              <NavbarItem link="/vproductlist" name="Product List"></NavbarItem>
              <li className="navbar-item">
                <a
                  href="/login"
                  onClick={function() {
                    console.log("a");
                    localStorage.setItem("id_hash", "");
                    localStorage.setItem("type", "0");
                  }}
                  className="nav-link"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export class CustomerNavbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a href="/dashboard" className="navbar-brand">
            Bulk Purchase App
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {/* <NavbarItem link="/" name="Users"></NavbarItem> */}
              <NavbarItem link="/login" name="Login"></NavbarItem>
              <NavbarItem link="/register" name="Register"></NavbarItem>
              <li className="navbar-item">
                <a
                  href="/login"
                  onClick={function() {
                    console.log("a");
                    localStorage.setItem("id_hash", "");
                    localStorage.setItem("type", "0");
                  }}
                  className="nav-link"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}