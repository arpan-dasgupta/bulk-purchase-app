import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
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

export default class MyNavbar extends Component {
  render() {
    return (
      // <div className="container">
      //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //     <a href="/login" className="navbar-brand">
      //       Bulk Purchase App
      //     </a>
      //     <div className="collapse navbar-collapse">
      //       <ul className="navbar-nav mr-auto">
      //         <NavbarItem link="/" name="Users"></NavbarItem>
      //         <NavbarItem link="/register" name="Register"></NavbarItem>
      //         <NavbarItem link="/login" name="Login"></NavbarItem>
      //       </ul>
      //     </div>
      //   </nav>
      // </div>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/login">Bulk Purchase App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/login">Users</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export class VendorNavbar extends Component {
  render() {
    return (
      // <div className="container">
      //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //     <a href="/dashboard" className="navbar-brand">
      //       Bulk Purchase App
      //     </a>
      //     <div className="collapse navbar-collapse">
      //       <ul className="navbar-nav mr-auto">
      //         <NavbarItem link="/addproduct" name="Add Product"></NavbarItem>
      //         <NavbarItem link="/vproductlist" name="Product List"></NavbarItem>
      //         <NavbarItem link="/readyprod" name="Products Ready"></NavbarItem>
      //         <NavbarItem
      //           link="/dispprod"
      //           name="Products Dispatched"
      //         ></NavbarItem>
      //         <li className="navbar-item">
      //           <a
      //             href="/login"
      //             onClick={function() {
      //               console.log("a");
      //               localStorage.setItem("id_hash", "");
      //               localStorage.setItem("type", "0");
      //             }}
      //             className="nav-link"
      //           >
      //             Logout
      //           </a>
      //         </li>
      //       </ul>
      //     </div>
      //   </nav>
      // </div>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/dashboard">Bulk Purchase App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/addproduct">Add Product</Nav.Link>
              <NavDropdown title="Products" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/vproductlist">
                  Waiting Product
                </NavDropdown.Item>
                <NavDropdown.Item href="/readyprod">
                  Ready Products
                </NavDropdown.Item>
                <NavDropdown.Item href="/dispprod">
                  Dispatched Products
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                href="/login"
                onClick={function() {
                  console.log("a");
                  localStorage.setItem("id_hash", "");
                  localStorage.setItem("type", "0");
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export class CustomerNavbar extends Component {
  render() {
    return (
      // <div className="container">
      //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //     <a href="/dashboard" className="navbar-brand">
      //       Bulk Purchase App
      //     </a>
      //     <div className="collapse navbar-collapse">
      //       <ul className="navbar-nav mr-auto">
      //         {/* <NavbarItem link="/" name="Users"></NavbarItem> */}
      //         {/* <NavbarItem link="/login" name="Login"></NavbarItem> */}
      //         {/* <NavbarItem link="/register" name="Register"></NavbarItem> */}
      //         <NavbarItem link="/myorders" name="My Orders"></NavbarItem>
      //         <li className="navbar-item">
      //           <a
      //             href="/login"
      //             onClick={function() {
      //               console.log("a");
      //               localStorage.setItem("id_hash", "");
      //               localStorage.setItem("type", "0");
      //             }}
      //             className="nav-link"
      //           >
      //             Logout
      //           </a>
      //         </li>
      //       </ul>
      //     </div>
      //   </nav>
      // </div>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/dashboard">Bulk Purchase App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/myorders">My Orders</Nav.Link>
              {/* <NavDropdown title="Products" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/vproductlist">
                  Waiting Product
                </NavDropdown.Item>
                <NavDropdown.Item href="/readyprod">
                  Ready Products
                </NavDropdown.Item>
                <NavDropdown.Item href="/dispprod">
                  Dispatched Products
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link
                href="/login"
                onClick={function() {
                  console.log("a");
                  localStorage.setItem("id_hash", "");
                  localStorage.setItem("type", "0");
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
