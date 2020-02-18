import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users-list";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import ProductForm from "./components/vproduct-add";
import MyProds from "./components/vproduct-list";

function App() {
  return (
    <Router>
      <div className="container">
        {/* <Navbar></Navbar> */}
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
              <li className="navbar-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/" exact component={UsersList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/addproduct" component={ProductForm} />
        <Route path="/vproductlist" component={MyProds} />
        {/* <Route path="/vdashboard" component={Vdashboard} /> */}
      </div>
    </Router>
  );
}

export default App;
