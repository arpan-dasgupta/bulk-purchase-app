import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users-list";
import Login from "./components/login";
import Register from "./components/register";
import Cdashboard from "./components/cust-dashboard";
import Vdashboard from "./components/vend-dashboard";

function App() {
  return (
    <Router>
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
        <Route path="/cdashboard" component={Cdashboard} />
        <Route path="/vdashboard" component={Vdashboard} />
      </div>
    </Router>
  );
}

export default App;
